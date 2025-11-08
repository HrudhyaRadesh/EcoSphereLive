import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp } from "lucide-react";

interface PersonalImpactProps {
  yourCO2Saved: number;
  thisMonthCO2: number;
  lastMonthCO2: number;
  achievements: string[];
}

export default function PersonalImpact({
  yourCO2Saved,
  thisMonthCO2,
  lastMonthCO2,
  achievements,
}: PersonalImpactProps) {
  const percentageChange = lastMonthCO2 > 0 
    ? ((thisMonthCO2 - lastMonthCO2) / lastMonthCO2) * 100 
    : 0;
  
  const progressValue = Math.min((thisMonthCO2 / 10) * 100, 100);

  return (
    <Card data-testid="card-personal-impact">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
        <CardTitle className="text-2xl font-serif">Your Impact</CardTitle>
        <Award className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-serif font-bold text-primary" data-testid="text-your-co2-saved">
              {yourCO2Saved.toFixed(1)}
            </span>
            <span className="text-lg text-muted-foreground">tons CO₂ saved</span>
          </div>
          <p className="text-sm text-muted-foreground">Your lifetime contribution</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">This Month</span>
            <span className="text-sm text-muted-foreground" data-testid="text-this-month-co2">
              {thisMonthCO2.toFixed(1)}kg CO₂
            </span>
          </div>
          <Progress value={progressValue} className="h-2" data-testid="progress-monthly-goal" />
          <p className="text-xs text-muted-foreground">
            Goal: 10kg CO₂ per month
          </p>
        </div>

        {percentageChange !== 0 && (
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-md">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium" data-testid="text-percentage-change">
              {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}% vs last month
            </span>
          </div>
        )}

        {achievements.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Recent Achievements</p>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => (
                <Badge key={index} variant="secondary" data-testid={`badge-achievement-${index}`}>
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
