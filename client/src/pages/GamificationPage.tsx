import GreenPointsDisplay from "@/components/GreenPointsDisplay";
import BadgeCard from "@/components/BadgeCard";
import LeaderboardTable from "@/components/LeaderboardTable";
import AuthNavbar from "@/components/AuthNavbar";
import { Trophy, Award, Leaf, Star, Crown, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GamificationPage() {
  const leaderboardEntries = [
    { rank: 1, username: "EcoWarrior2024", points: 15420 },
    { rank: 2, username: "GreenThumb", points: 12350 },
    { rank: 3, username: "EarthLover99", points: 10200 },
    { rank: 4, username: "You", points: 8500, isCurrentUser: true },
    { rank: 5, username: "NatureFanatic", points: 7800 },
    { rank: 6, username: "SustainableLife", points: 6950 },
    { rank: 7, username: "EcoHero", points: 6420 },
    { rank: 8, username: "GreenDreamer", points: 5890 },
  ];

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
            <GreenPointsDisplay points={8500} level={5} rank={4} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Badges Earned</span>
                <span className="font-medium">12 / 20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Challenges Completed</span>
                <span className="font-medium">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Days Active</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CO₂ Saved</span>
                <span className="font-medium text-primary">2,145 kg</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Achievements</h2>
            <div className="text-sm text-muted-foreground">12 of 20 unlocked</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <BadgeCard 
              icon={Award}
              title="Carbon Saver"
              description="Reduced carbon by 100kg"
              unlocked={true}
              date="Nov 5, 2025"
            />
            <BadgeCard 
              icon={Leaf}
              title="Green Hero"
              description="Logged 30 consecutive days"
              unlocked={true}
              date="Nov 3, 2025"
            />
            <BadgeCard 
              icon={Star}
              title="Eco Champion"
              description="Reached Level 5"
              unlocked={true}
              date="Nov 1, 2025"
            />
            <BadgeCard 
              icon={Trophy}
              title="Top 10"
              description="Ranked in top 10 globally"
              unlocked={false}
            />
            <BadgeCard 
              icon={Target}
              title="Goal Crusher"
              description="Complete 50 challenges"
              unlocked={false}
            />
            <BadgeCard 
              icon={Crown}
              title="Eco Master"
              description="Reach Level 10"
              unlocked={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LeaderboardTable entries={leaderboardEntries} />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Weekly Carbon Goal</span>
                    <span className="text-muted-foreground">3/7 days</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "43%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">+100 pts on completion</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Eco Route Master</span>
                    <span className="text-muted-foreground">8/10 routes</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "80%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">+250 pts on completion</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Green Designer</span>
                    <span className="text-muted-foreground">1/3 designs</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "33%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">+150 pts on completion</div>
                </div>
              </CardContent>
            </Card>

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
