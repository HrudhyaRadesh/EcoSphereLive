import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AuthNavbar from "@/components/AuthNavbar";
import { BarChart3, Map, Sparkles, Building2, Trophy, TrendingDown } from "lucide-react";
import { Link } from "wouter";
import { getCurrentUser } from "@/lib/auth";

export default function DashboardPage() {
  const user = getCurrentUser();

  const modules = [
    {
      href: "/ecotrack",
      icon: BarChart3,
      title: "EcoTrack Dashboard",
      description: "Monitor your carbon footprint in real-time with interactive charts and personalized insights",
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
      testId: "card-module-ecotrack"
    },
    {
      href: "/routes",
      icon: Map,
      title: "Smart Eco Routes",
      description: "Find the most sustainable travel routes with live CO₂ calculations and eco scores",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      testId: "card-module-routes"
    },
    {
      href: "/designer",
      icon: Sparkles,
      title: "AI Green Designer",
      description: "Get AI-powered recommendations for sustainable home layouts and eco-friendly products",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      testId: "card-module-designer"
    },
    {
      href: "/urban",
      icon: Building2,
      title: "Urban Insights (India)",
      description: "Explore city-level sustainability data for Indian cities and contribute to community goals",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      testId: "card-module-urban"
    },
    {
      href: "/gamification",
      icon: Trophy,
      title: "Gamification Zone",
      description: "Earn green points, unlock badges, and compete on the global sustainability leaderboard",
      color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      testId: "card-module-gamification"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar title="Dashboard" showBack={false} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.username || 'Eco Warrior'}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose a module below to continue your sustainability journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Your Impact</CardTitle>
                  <CardDescription>Total CO₂ Saved</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">--</div>
              <p className="text-sm text-muted-foreground mt-1">Start tracking to see your impact</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Green Points</CardTitle>
                  <CardDescription>Your Rank</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">--</div>
              <p className="text-sm text-muted-foreground mt-1">Complete activities to earn points</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">This Month</CardTitle>
                  <CardDescription>Days Active</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">--</div>
              <p className="text-sm text-muted-foreground mt-1">Track daily to increase streak</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Explore Modules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link key={module.href} href={module.href}>
              <Card 
                className="hover-elevate cursor-pointer transition-all duration-300 h-full"
                data-testid={module.testId}
              >
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${module.color}`}>
                    <module.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{module.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20">
          <h3 className="font-semibold text-lg mb-2">🌱 Quick Tip</h3>
          <p className="text-muted-foreground">
            Start with the EcoTrack Dashboard to log your daily activities and see your carbon footprint. 
            Then explore Smart Eco Routes to find sustainable travel options!
          </p>
        </div>
      </div>
    </div>
  );
}
