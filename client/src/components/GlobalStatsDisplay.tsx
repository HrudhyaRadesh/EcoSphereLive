import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Users, TrendingDown, Leaf } from "lucide-react";

interface GlobalStats {
  totalActiveUsers: number;
  totalCo2Saved: number;
  citiesWorldwide: number;
}

export default function GlobalStatsDisplay() {
  const { data: stats } = useQuery<GlobalStats>({
    queryKey: ["/api/global-stats"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <Users className="h-8 w-8 text-primary-foreground mb-3 mx-auto" />
        <div className="text-3xl font-bold text-white mb-1" data-testid="text-active-users">
          {stats ? formatNumber(stats.totalActiveUsers) : "--"}
        </div>
        <div className="text-sm text-white/80">Active Users</div>
      </Card>
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <TrendingDown className="h-8 w-8 text-primary-foreground mb-3 mx-auto" />
        <div className="text-3xl font-bold text-white mb-1" data-testid="text-co2-saved">
          {stats ? formatNumber(stats.totalCo2Saved) : "--"}
        </div>
        <div className="text-sm text-white/80">Tons CO₂ Saved</div>
      </Card>
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <Leaf className="h-8 w-8 text-primary-foreground mb-3 mx-auto" />
        <div className="text-3xl font-bold text-white mb-1" data-testid="text-cities">
          {stats ? stats.citiesWorldwide : "--"}
        </div>
        <div className="text-sm text-white/80">Cities Worldwide</div>
      </Card>
    </div>
  );
}
