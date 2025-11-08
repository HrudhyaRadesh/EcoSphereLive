import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ActivityCardProps {
  type: string;
  description: string;
  co2Saved: number;
  pointsEarned: number;
  timestamp: string;
  icon?: string;
}

export default function ActivityCard({
  type,
  description,
  co2Saved,
  pointsEarned,
  timestamp,
  icon,
}: ActivityCardProps) {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      recycling: "bg-chart-2/10 text-chart-2",
      biking: "bg-chart-1/10 text-chart-1",
      planting: "bg-chart-4/10 text-chart-4",
      energy: "bg-chart-5/10 text-chart-5",
    };
    return colors[type.toLowerCase()] || "bg-muted text-muted-foreground";
  };

  return (
    <Card className="hover-elevate" data-testid={`card-activity-${type.toLowerCase()}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <img src={icon} alt={type} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <Badge variant="secondary" className={getTypeColor(type)} data-testid={`badge-activity-type-${type.toLowerCase()}`}>
                {type}
              </Badge>
              <span className="text-xs text-muted-foreground whitespace-nowrap" data-testid="text-activity-timestamp">
                {timestamp}
              </span>
            </div>
            <p className="text-sm mb-2" data-testid="text-activity-description">{description}</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-primary font-medium" data-testid="text-activity-co2">
                +{co2Saved.toFixed(1)}kg CO₂
              </span>
              <span className="text-muted-foreground" data-testid="text-activity-points">
                +{pointsEarned} points
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
