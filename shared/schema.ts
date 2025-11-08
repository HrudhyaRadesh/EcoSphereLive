import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  city: text("city"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userMetrics = pgTable("user_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  greenPoints: integer("green_points").notNull().default(0),
  co2Saved: real("co2_saved").notNull().default(0),
  level: integer("level").notNull().default(1),
  rank: integer("rank"),
  daysActive: integer("days_active").notNull().default(0),
  badgesEarned: integer("badges_earned").notNull().default(0),
  challengesCompleted: integer("challenges_completed").notNull().default(0),
  lastActiveDate: timestamp("last_active_date"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  activityType: text("activity_type").notNull(),
  co2Impact: real("co2_impact").notNull(),
  pointsEarned: integer("points_earned").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const globalStats = pgTable("global_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalActiveUsers: integer("total_active_users").notNull().default(0),
  totalCo2Saved: real("total_co2_saved").notNull().default(0),
  citiesWorldwide: integer("cities_worldwide").notNull().default(0),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const badges = pgTable("badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  badgeType: text("badge_type").notNull(),
  badgeTitle: text("badge_title").notNull(),
  badgeDescription: text("badge_description").notNull(),
  unlocked: boolean("unlocked").notNull().default(false),
  unlockedAt: timestamp("unlocked_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  city: true,
});

export const insertUserMetricsSchema = createInsertSchema(userMetrics).omit({
  id: true,
  updatedAt: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});

export const insertGlobalStatsSchema = createInsertSchema(globalStats).omit({
  id: true,
  lastUpdated: true,
});

export const insertBadgeSchema = createInsertSchema(badges).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertUserMetrics = z.infer<typeof insertUserMetricsSchema>;
export type UserMetrics = typeof userMetrics.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

export type InsertGlobalStats = z.infer<typeof insertGlobalStatsSchema>;
export type GlobalStats = typeof globalStats.$inferSelect;

export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type Badge = typeof badges.$inferSelect;
