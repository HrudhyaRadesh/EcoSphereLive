import { 
  type User, 
  type InsertUser,
  type UserMetrics,
  type InsertUserMetrics,
  type Activity,
  type InsertActivity,
  type GlobalStats,
  type InsertGlobalStats,
  type Badge,
  type InsertBadge,
  users,
  userMetrics,
  activities,
  globalStats,
  badges
} from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc, sql, count } from "drizzle-orm";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const client = neon(databaseUrl);
export const db = drizzle(client);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // User metrics methods
  getUserMetrics(userId: string): Promise<UserMetrics | undefined>;
  createUserMetrics(metrics: InsertUserMetrics): Promise<UserMetrics>;
  updateUserMetrics(userId: string, updates: Partial<UserMetrics>): Promise<UserMetrics | undefined>;
  getUserMetricsWithRank(userId: string): Promise<(UserMetrics & { rank: number }) | undefined>;
  getTopUsers(limit: number): Promise<Array<UserMetrics & { username: string }>>;
  
  // Activity methods
  createActivity(activity: InsertActivity): Promise<Activity>;
  getUserActivities(userId: string, limit?: number): Promise<Activity[]>;
  getActivitiesThisMonth(userId: string): Promise<Activity[]>;
  
  // Global stats methods
  getGlobalStats(): Promise<GlobalStats | undefined>;
  updateGlobalStats(updates: Partial<GlobalStats>): Promise<GlobalStats>;
  recalculateGlobalStats(): Promise<GlobalStats>;
  
  // Badge methods
  getUserBadges(userId: string): Promise<Badge[]>;
  createBadge(badge: InsertBadge): Promise<Badge>;
  unlockBadge(userId: string, badgeType: string): Promise<Badge | undefined>;
  
  // Helper methods
  incrementDaysActive(userId: string): Promise<void>;
  updateUserRankings(): Promise<void>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    const user = result[0];
    
    // Create initial metrics for the user
    await this.createUserMetrics({ userId: user.id });
    
    // Initialize standard badges for the user
    const standardBadges = [
      { badgeType: "carbon_saver", badgeTitle: "Carbon Saver", badgeDescription: "Reduced carbon by 100kg" },
      { badgeType: "green_hero", badgeTitle: "Green Hero", badgeDescription: "Logged 30 consecutive days" },
      { badgeType: "eco_champion", badgeTitle: "Eco Champion", badgeDescription: "Reached Level 5" },
      { badgeType: "top_10", badgeTitle: "Top 10", badgeDescription: "Ranked in top 10 globally" },
      { badgeType: "goal_crusher", badgeTitle: "Goal Crusher", badgeDescription: "Complete 50 challenges" },
      { badgeType: "eco_master", badgeTitle: "Eco Master", badgeDescription: "Reach Level 10" },
    ];
    
    for (const badge of standardBadges) {
      await this.createBadge({ userId: user.id, ...badge });
    }
    
    // Recalculate global stats
    await this.recalculateGlobalStats();
    
    return user;
  }

  // User metrics methods
  async getUserMetrics(userId: string): Promise<UserMetrics | undefined> {
    const result = await db.select().from(userMetrics).where(eq(userMetrics.userId, userId));
    return result[0];
  }

  async createUserMetrics(metrics: InsertUserMetrics): Promise<UserMetrics> {
    const result = await db.insert(userMetrics).values(metrics).returning();
    return result[0];
  }

  async updateUserMetrics(userId: string, updates: Partial<UserMetrics>): Promise<UserMetrics | undefined> {
    const result = await db
      .update(userMetrics)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userMetrics.userId, userId))
      .returning();
    
    // Update rankings after metrics change
    await this.updateUserRankings();
    
    return result[0];
  }

  async getUserMetricsWithRank(userId: string): Promise<(UserMetrics & { rank: number }) | undefined> {
    const metrics = await this.getUserMetrics(userId);
    if (!metrics) return undefined;
    
    // Get rank based on green points
    const higherRanked = await db
      .select({ count: count() })
      .from(userMetrics)
      .where(sql`${userMetrics.greenPoints} > ${metrics.greenPoints}`);
    
    const rank = (higherRanked[0]?.count || 0) + 1;
    
    return { ...metrics, rank };
  }

  async getTopUsers(limit: number = 10): Promise<Array<UserMetrics & { username: string }>> {
    const result = await db
      .select({
        id: userMetrics.id,
        userId: userMetrics.userId,
        greenPoints: userMetrics.greenPoints,
        co2Saved: userMetrics.co2Saved,
        level: userMetrics.level,
        rank: userMetrics.rank,
        daysActive: userMetrics.daysActive,
        badgesEarned: userMetrics.badgesEarned,
        challengesCompleted: userMetrics.challengesCompleted,
        lastActiveDate: userMetrics.lastActiveDate,
        updatedAt: userMetrics.updatedAt,
        username: users.username,
      })
      .from(userMetrics)
      .innerJoin(users, eq(userMetrics.userId, users.id))
      .orderBy(desc(userMetrics.greenPoints))
      .limit(limit);
    
    return result;
  }

  // Activity methods
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const result = await db.insert(activities).values(activity).returning();
    const createdActivity = result[0];
    
    // Update user metrics based on activity
    const currentMetrics = await this.getUserMetrics(activity.userId);
    if (currentMetrics) {
      const newCo2Saved = currentMetrics.co2Saved + Math.abs(activity.co2Impact);
      const newPoints = currentMetrics.greenPoints + activity.pointsEarned;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      
      await this.updateUserMetrics(activity.userId, {
        co2Saved: newCo2Saved,
        greenPoints: newPoints,
        level: newLevel,
        lastActiveDate: new Date(),
      });
      
      // Check and unlock badges
      await this.checkAndUnlockBadges(activity.userId, currentMetrics, { 
        co2Saved: newCo2Saved, 
        greenPoints: newPoints,
        level: newLevel 
      });
    }
    
    // Update global stats
    await this.recalculateGlobalStats();
    
    return createdActivity;
  }

  async getUserActivities(userId: string, limit: number = 50): Promise<Activity[]> {
    return await db
      .select()
      .from(activities)
      .where(eq(activities.userId, userId))
      .orderBy(desc(activities.createdAt))
      .limit(limit);
  }

  async getActivitiesThisMonth(userId: string): Promise<Activity[]> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return await db
      .select()
      .from(activities)
      .where(
        sql`${activities.userId} = ${userId} AND ${activities.createdAt} >= ${firstDayOfMonth}`
      )
      .orderBy(desc(activities.createdAt));
  }

  // Global stats methods
  async getGlobalStats(): Promise<GlobalStats | undefined> {
    const result = await db.select().from(globalStats).limit(1);
    
    // If no global stats exist, create them
    if (result.length === 0) {
      return await this.recalculateGlobalStats();
    }
    
    return result[0];
  }

  async updateGlobalStats(updates: Partial<GlobalStats>): Promise<GlobalStats> {
    // Query database directly instead of calling getGlobalStats() to avoid circular dependency
    const existingStats = await db.select().from(globalStats).limit(1);
    
    if (existingStats.length === 0) {
      const result = await db.insert(globalStats).values(updates as InsertGlobalStats).returning();
      return result[0];
    }
    
    const result = await db
      .update(globalStats)
      .set({ ...updates, lastUpdated: new Date() })
      .where(eq(globalStats.id, existingStats[0].id))
      .returning();
    
    return result[0];
  }

  async recalculateGlobalStats(): Promise<GlobalStats> {
    // Count active users (users with at least one activity)
    const activeUsersResult = await db
      .select({ count: sql<number>`COUNT(DISTINCT ${activities.userId})` })
      .from(activities);
    
    const totalActiveUsers = Number(activeUsersResult[0]?.count || 0);
    
    // Sum total CO2 saved
    const co2Result = await db
      .select({ total: sql<number>`COALESCE(SUM(${userMetrics.co2Saved}), 0)` })
      .from(userMetrics);
    
    const totalCo2Saved = Number(co2Result[0]?.total || 0);
    
    // Count total users (replacing previous "cities worldwide" metric)
    const usersResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users);
    
    const citiesWorldwide = Number(usersResult[0]?.count || 0);
    
    return await this.updateGlobalStats({
      totalActiveUsers,
      totalCo2Saved,
      citiesWorldwide,
    });
  }

  // Badge methods
  async getUserBadges(userId: string): Promise<Badge[]> {
    return await db
      .select()
      .from(badges)
      .where(eq(badges.userId, userId))
      .orderBy(desc(badges.unlockedAt));
  }

  async createBadge(badge: InsertBadge): Promise<Badge> {
    const result = await db.insert(badges).values(badge).returning();
    return result[0];
  }

  async unlockBadge(userId: string, badgeType: string): Promise<Badge | undefined> {
    const result = await db
      .update(badges)
      .set({ unlocked: true, unlockedAt: new Date() })
      .where(sql`${badges.userId} = ${userId} AND ${badges.badgeType} = ${badgeType} AND ${badges.unlocked} = false`)
      .returning();
    
    if (result[0]) {
      // Increment badges earned count
      const currentMetrics = await this.getUserMetrics(userId);
      if (currentMetrics) {
        await this.updateUserMetrics(userId, {
          badgesEarned: currentMetrics.badgesEarned + 1,
        });
      }
    }
    
    return result[0];
  }

  // Helper methods
  async incrementDaysActive(userId: string): Promise<void> {
    const metrics = await this.getUserMetrics(userId);
    if (!metrics) return;
    
    const lastActive = metrics.lastActiveDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Only increment if last active date is not today
    if (!lastActive || lastActive < today) {
      await this.updateUserMetrics(userId, {
        daysActive: metrics.daysActive + 1,
        lastActiveDate: new Date(),
      });
    }
  }

  async updateUserRankings(): Promise<void> {
    // Get all users sorted by green points
    const allMetrics = await db
      .select()
      .from(userMetrics)
      .orderBy(desc(userMetrics.greenPoints));
    
    // Update rank for each user
    for (let i = 0; i < allMetrics.length; i++) {
      await db
        .update(userMetrics)
        .set({ rank: i + 1 })
        .where(eq(userMetrics.id, allMetrics[i].id));
    }
  }

  private async checkAndUnlockBadges(
    userId: string, 
    oldMetrics: UserMetrics, 
    newMetrics: { co2Saved: number; greenPoints: number; level: number }
  ): Promise<void> {
    // Carbon Saver: Reduced carbon by 100kg
    if (oldMetrics.co2Saved < 100 && newMetrics.co2Saved >= 100) {
      await this.unlockBadge(userId, "carbon_saver");
    }
    
    // Eco Champion: Reached Level 5
    if (oldMetrics.level < 5 && newMetrics.level >= 5) {
      await this.unlockBadge(userId, "eco_champion");
    }
    
    // Eco Master: Reached Level 10
    if (oldMetrics.level < 10 && newMetrics.level >= 10) {
      await this.unlockBadge(userId, "eco_master");
    }
    
    // Green Hero: 30 consecutive days (check daysActive)
    if (oldMetrics.daysActive < 30 && oldMetrics.daysActive >= 30) {
      await this.unlockBadge(userId, "green_hero");
    }
    
    // Goal Crusher: 50 challenges
    if (oldMetrics.challengesCompleted < 50 && oldMetrics.challengesCompleted >= 50) {
      await this.unlockBadge(userId, "goal_crusher");
    }
  }
}

export const storage = new DbStorage();
