import GreenPointsDisplay from "@/components/GreenPointsDisplay";
import BadgeCard from "@/components/BadgeCard";
import LeaderboardTable from "@/components/LeaderboardTable";
import AuthNavbar from "@/components/AuthNavbar";
import { Trophy, Award, Leaf, Star, Crown, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface UserMetrics {
  greenPoints: number;
  co2Saved: number;
  daysActive: number;
  rank: number;
  level: number;
  badgesEarned: number;
  challengesCompleted: number;
}

interface Badge {
  badgeType: string;
  badgeTitle: string;
  badgeDescription: string;
  unlocked: boolean;
  unlockedAt: string | null;
}

export default function GamificationPage() {
  const { data: metrics } = useQuery<UserMetrics>({
    queryKey: ["/api/user/metrics"],
  });

  const { data: leaderboard } = useQuery<any[]>({
    queryKey: ["/api/leaderboard"],
  });

  const { data: badges } = useQuery<Badge[]>({
    queryKey: ["/api/user/badges"],
  });

  const badgeIcons: Record<string, any> = {
    carbon_saver: Award,
    green_hero: Leaf,
    eco_champion: Star,
    top_10: Trophy,
    goal_crusher: Target,
    eco_master: Crown,
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar title="Gamification Zone" icon={Trophy} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Sustainability Journey</h1>
          <p className="text-muted-foreground text-lg">
            Track your progress, unlock achievements, and compete with eco-warriors worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <GreenPointsDisplay 
              points={metrics?.greenPoints || 0} 
              level={metrics?.level || 1} 
              rank={metrics?.rank || 0} 
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Badges Earned</span>
                <span className="font-medium">
                  {metrics?.badgesEarned || 0} / {badges?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Challenges Completed</span>
                <span className="font-medium">{metrics?.challengesCompleted || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Days Active</span>
                <span className="font-medium">{metrics?.daysActive || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CO₂ Saved</span>
                <span className="font-medium text-primary">
                  {metrics ? `${metrics.co2Saved.toFixed(1)} kg` : "0 kg"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Achievements</h2>
            <div className="text-sm text-muted-foreground">
              {metrics?.badgesEarned || 0} of {badges?.length || 0} unlocked
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges && badges.map((badge) => (
              <BadgeCard 
                key={badge.badgeType}
                icon={badgeIcons[badge.badgeType] || Award}
                title={badge.badgeTitle}
                description={badge.badgeDescription}
                unlocked={badge.unlocked}
                date={badge.unlockedAt ? new Date(badge.unlockedAt).toLocaleDateString() : undefined}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LeaderboardTable entries={leaderboard || []} />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earn More Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span>Daily Check-in</span>
                  <span className="font-medium text-primary">+10 pts</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span>Save Carbon Data</span>
                  <span className="font-medium text-primary">+25 pts</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span>Complete Eco Route</span>
                  <span className="font-medium text-primary">+50 pts</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span>Generate Design</span>
                  <span className="font-medium text-primary">+75 pts</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
