import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertActivitySchema, insertUserSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(
  storedPassword: string,
  suppliedPassword: string
): Promise<boolean> {
  const [hashedPassword, salt] = storedPassword.split(".");
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  const suppliedPasswordBuf = (await scryptAsync(
    suppliedPassword,
    salt,
    64
  )) as Buffer;
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}

// Middleware to check authentication
function requireAuth(req: Request, res: Response, next: Function) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Register endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validation = insertUserSchema.safeParse(req.body);
      
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ error: validationError.message });
      }

      const { username, password, email } = validation.data;

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        email: email || null,
      });

      // Set session
      req.session.userId = user.id;

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await comparePasswords(user.password, password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Set session
      req.session.userId = user.id;

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  // Get current user
  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

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
  app.get("/api/user/metrics", requireAuth, async (req, res) => {
    try {
      const metrics = await storage.getUserMetricsWithRank(req.session.userId!);
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching user metrics:", error);
      res.status(500).json({ error: "Failed to fetch user metrics" });
    }
  });

  // Get user's activities
  app.get("/api/user/activities", requireAuth, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const activities = await storage.getUserActivities(req.session.userId!, limit);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching user activities:", error);
      res.status(500).json({ error: "Failed to fetch user activities" });
    }
  });

  // Get user's activities this month
  app.get("/api/user/activities/month", requireAuth, async (req, res) => {
    try {
      const activities = await storage.getActivitiesThisMonth(req.session.userId!);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching monthly activities:", error);
      res.status(500).json({ error: "Failed to fetch monthly activities" });
    }
  });

  // Create an activity
  app.post("/api/activities", requireAuth, async (req, res) => {
    try {
      const validation = insertActivitySchema.safeParse({
        ...req.body,
        userId: req.session.userId,
      });

      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ error: validationError.message });
      }

      const activity = await storage.createActivity(validation.data);
      
      // Increment days active
      await storage.incrementDaysActive(req.session.userId!);
      
      // Get updated metrics to return
      const metrics = await storage.getUserMetricsWithRank(req.session.userId!);
      
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
        isCurrentUser: req.session.userId === user.userId,
      }));
      
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Get user badges
  app.get("/api/user/badges", requireAuth, async (req, res) => {
    try {
      const badges = await storage.getUserBadges(req.session.userId!);
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

  // Compare all transport modes for a given distance
  app.post("/api/routes/compare", requireAuth, async (req, res) => {
    try {
      const { distance } = req.body;

      if (!distance || distance <= 0) {
        return res.status(400).json({ error: "Valid distance is required" });
      }

      const distanceKm = parseFloat(distance);

      // Average speeds in km/h for each mode
      const averageSpeeds: Record<string, number> = {
        walk: 5,      // Walking speed
        bike: 15,     // Cycling speed
        bus: 30,      // Average bus speed with stops
        car: 60,      // Average car speed in traffic
      };

      // CO2 emission factors in kg CO2 per km
      const emissionFactors: Record<string, number> = {
        walk: 0,         // Zero emissions
        bike: 0,         // Zero emissions
        bus: 0.089,      // Public bus per passenger
        car: 0.192,      // Average car
      };

      // Calculate routes for all modes
      const routes = Object.keys(averageSpeeds).map(mode => {
        const durationMin = (distanceKm / averageSpeeds[mode]) * 60;
        const co2Emissions = distanceKm * emissionFactors[mode];
        
        // Calculate eco-score (0-100, higher is better)
        const maxEmissions = distanceKm * emissionFactors.car;
        const ecoScore = maxEmissions > 0 
          ? Math.round(((maxEmissions - co2Emissions) / maxEmissions) * 100) 
          : 100;

        return {
          mode: mode.charAt(0).toUpperCase() + mode.slice(1),
          duration: durationMin,
          co2Emissions: co2Emissions,
          ecoScore: ecoScore,
        };
      });

      console.log(`Calculated ${routes.length} routes for ${distanceKm} km`);

      res.json({ routes });
    } catch (error) {
      console.error("Error comparing routes:", error);
      res.status(500).json({ error: "Failed to compare routes" });
    }
  });

  // Calculate eco-friendly route using OSRM (OpenStreetMap)
  app.post("/api/routes/calculate", requireAuth, async (req, res) => {
    try {
      const { origin, destination, vehicleType = 'car' } = req.body;
      
      console.log("Received route request with vehicleType:", vehicleType, typeof vehicleType);

      if (!origin || !destination || !origin.lat || !origin.lng || !destination.lat || !destination.lng) {
        return res.status(400).json({ error: "Origin and destination with lat/lng are required" });
      }

      // Map vehicle types to OSRM routing profiles
      const routingProfiles: Record<string, string> = {
        car: 'driving',
        electric: 'driving',
        bus: 'driving',
        bike: 'cycling',
        walk: 'foot',
      };

      const profile = routingProfiles[vehicleType] || 'driving';

      // Call OSRM API for route calculation with appropriate profile
      const osrmUrl = `http://router.project-osrm.org/route/v1/${profile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&steps=true`;
      
      const response = await fetch(osrmUrl);
      const data = await response.json();

      if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
        return res.status(400).json({ error: "Could not calculate route" });
      }

      const route = data.routes[0];
      const distanceKm = route.distance / 1000; // Convert meters to km
      const durationMin = route.duration / 60; // Convert seconds to minutes

      // Calculate CO2 emissions based on vehicle type and distance
      // Average emissions in kg CO2 per km
      const emissionFactors: Record<string, number> = {
        car: 0.192,      // Average car
        electric: 0.053, // Electric vehicle
        bus: 0.089,      // Public bus per passenger
        bike: 0,         // Zero emissions
        walk: 0,         // Zero emissions
      };

      const emissionFactor = emissionFactors[vehicleType] ?? emissionFactors.car;
      console.log(`Emission factor for ${vehicleType}:`, emissionFactor, `(from lookup: ${emissionFactors[vehicleType]})`);
      const co2Emissions = distanceKm * emissionFactor;

      // Calculate eco-score (0-100, higher is better)
      const maxEmissions = distanceKm * emissionFactors.car;
      const ecoScore = maxEmissions > 0 
        ? Math.round(((maxEmissions - co2Emissions) / maxEmissions) * 100) 
        : 100;

      const routeResponse = {
        route: {
          geometry: route.geometry,
          distance: distanceKm,
          duration: durationMin,
          co2Emissions: co2Emissions,
          ecoScore: ecoScore,
          vehicleType: vehicleType,
        },
        waypoints: data.waypoints,
      };

      console.log(`Route calculated for ${vehicleType}: ${distanceKm.toFixed(1)} km, CO2: ${co2Emissions.toFixed(2)} kg, Eco Score: ${ecoScore}`);

      res.json(routeResponse);
    } catch (error) {
      console.error("Error calculating route:", error);
      res.status(500).json({ error: "Failed to calculate route" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
