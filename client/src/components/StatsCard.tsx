import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
}

export default function StatsCard({ icon: Icon, title, value, change, trend }: StatsCardProps) {
  return (
    <Card data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${trend === 'down' ? 'text-primary' : 'text-muted-foreground'}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
