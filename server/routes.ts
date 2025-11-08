import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertActivitySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get global stats
  app.get("/api/global-stats", async (req, res) => {
    try {
      const stats = await storage.getGlobalStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching global stats:", error);
      res.status(500).json({ error: "Failed to fetch global stats" });
    }
  });

  // Get current user's metrics
  app.get("/api/user/metrics", async (req, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const metrics = await storage.getUserMetricsWithRank(req.user.id);
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching user metrics:", error);
      res.status(500).json({ error: "Failed to fetch user metrics" });
    }
  });

  // Get user's activities
  app.get("/api/user/activities", async (req, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const activities = await storage.getUserActivities(req.user.id, limit);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching user activities:", error);
      res.status(500).json({ error: "Failed to fetch user activities" });
    }
  });

  // Get user's activities this month
  app.get("/api/user/activities/month", async (req, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const activities = await storage.getActivitiesThisMonth(req.user.id);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching monthly activities:", error);
      res.status(500).json({ error: "Failed to fetch monthly activities" });
    }
  });

  // Create an activity
  app.post("/api/activities", async (req, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const validation = insertActivitySchema.safeParse({
        ...req.body,
        userId: req.user.id,
      });

      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ error: validationError.message });
      }

      const activity = await storage.createActivity(validation.data);
      
      // Increment days active
      await storage.incrementDaysActive(req.user.id);
      
      // Get updated metrics to return
      const metrics = await storage.getUserMetricsWithRank(req.user.id);
      
      res.json({ activity, metrics });
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(500).json({ error: "Failed to create activity" });
    }
  });

  // Get leaderboard
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const topUsers = await storage.getTopUsers(limit);
      
      // Add rank to each user
      const leaderboard = topUsers.map((user, index) => ({
        rank: index + 1,
        username: user.username,
        points: user.greenPoints,
        co2Saved: user.co2Saved,
        level: user.level,
        isCurrentUser: req.user?.id === user.userId,
      }));
      
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Get user badges
  app.get("/api/user/badges", async (req, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const badges = await storage.getUserBadges(req.user.id);
      res.json(badges);
    } catch (error) {
      console.error("Error fetching user badges:", error);
      res.status(500).json({ error: "Failed to fetch user badges" });
    }
  });

  // Recalculate global stats (admin endpoint, can be called periodically)
  app.post("/api/admin/recalculate-stats", async (req, res) => {
    try {
      const stats = await storage.recalculateGlobalStats();
      await storage.updateUserRankings();
      res.json(stats);
    } catch (error) {
      console.error("Error recalculating stats:", error);
      res.status(500).json({ error: "Failed to recalculate stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
