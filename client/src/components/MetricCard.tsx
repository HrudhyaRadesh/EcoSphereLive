import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit?: string;
  trend?: "up" | "down";
  decimals?: number;
}

export default function MetricCard({
  icon: Icon,
  label,
  value,
  unit = "",
  trend,
  decimals = 0,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      
      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <Card className="hover-elevate" data-testid={`card-metric-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2" data-testid={`text-metric-label-${label.toLowerCase().replace(/\s+/g, '-')}`}>
              {label}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold" data-testid={`text-metric-value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
                {formattedValue}
              </span>
              {unit && (
                <span className="text-lg text-muted-foreground">{unit}</span>
              )}
            </div>
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-sm ${trend === "up" ? "text-primary" : "text-muted-foreground"}`}>
                <span>{trend === "up" ? "↑" : "↓"}</span>
                <span>vs last month</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-md bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
