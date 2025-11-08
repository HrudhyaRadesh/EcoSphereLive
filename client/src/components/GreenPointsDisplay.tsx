import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GreenPointsDisplayProps {
  points: number;
  level: number;
  rank: number;
}

export default function GreenPointsDisplay({ points, level, rank }: GreenPointsDisplayProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5" data-testid="card-green-points">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{points.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Green Points</div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="mb-2">
              <Star className="h-3 w-3 mr-1" /> Level {level}
            </Badge>
            <div className="text-sm text-muted-foreground">Rank #{rank}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to Level {level + 1}</span>
            <span className="font-medium">{points % 1000} / 1000</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(points % 1000) / 10}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
