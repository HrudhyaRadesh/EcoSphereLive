import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EcoTrackCard from "@/components/EcoTrackCard";
import EcoChart from "@/components/EcoChart";
import StatsCard from "@/components/StatsCard";
import AuthNavbar from "@/components/AuthNavbar";
import { Car, UtensilsCrossed, Zap, Droplets, TrendingDown, Calendar, Leaf, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import type { UserMetrics } from "@shared/schema";

export default function EcoTrackPage() {
  const { toast } = useToast();
  const [carbonData, setCarbonData] = useState({
    travel: 0,
    diet: 0,
    electricity: 0,
    water: 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user metrics
  const { data: userMetrics, isLoading: metricsLoading } = useQuery<UserMetrics & { rank?: number }>({
    queryKey: ['/api/user/metrics'],
  });

  const totalCarbon = Object.values(carbonData).reduce((sum, val) => sum + val, 0);

  const handleSaveData = async () => {
    if (totalCarbon === 0) {
      toast({
        title: "No data to save",
        description: "Please enter some data before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Create a single aggregated activity with breakdown in metadata
      const response = await apiRequest("POST", "/api/activities", {
        activityType: "Carbon Tracking",
        co2Impact: totalCarbon,
        pointsEarned: Math.round(totalCarbon * 10), // 10 points per kg CO2 tracked
        metadata: JSON.stringify({
          source: 'eco-track',
          breakdown: {
            travel: carbonData.travel,
            diet: carbonData.diet,
            electricity: carbonData.electricity,
            water: carbonData.water,
          }
        }),
      });

      const result = await response.json();

      // Update the query data with the returned metrics instead of refetching
      if (result.metrics) {
        queryClient.setQueryData(['/api/user/metrics'], result.metrics);
      }

      // Invalidate other queries to refresh related data
      await queryClient.invalidateQueries({ queryKey: ['/api/user/activities'] });
      await queryClient.invalidateQueries({ queryKey: ['/api/leaderboard'] });
      await queryClient.invalidateQueries({ queryKey: ['/api/global-stats'] });

      toast({
        title: "Data Saved!",
        description: `Your carbon footprint of ${totalCarbon.toFixed(1)} kg has been saved and your metrics have been updated.`,
      });

      // Reset the form
      setCarbonData({
        travel: 0,
        diet: 0,
        electricity: 0,
        water: 0,
      });
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save data",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar title="EcoTrack Dashboard" icon={Leaf} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Track Your Carbon Footprint</h1>
          <p className="text-muted-foreground text-lg">
            Enter your daily activities to calculate your environmental impact in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            icon={TrendingDown}
            title="Total Carbon Saved"
            value={metricsLoading ? "..." : `${(userMetrics?.co2Saved || 0).toFixed(1)} kg`}
            change="Lifetime total"
            data-testid="stat-co2-saved"
          />
          <StatsCard 
            icon={Leaf}
            title="Green Points"
            value={metricsLoading ? "..." : (userMetrics?.greenPoints || 0)}
            change={`Level ${userMetrics?.level || 1}`}
            data-testid="stat-green-points"
          />
          <StatsCard 
            icon={Calendar}
            title="Days Active"
            value={metricsLoading ? "..." : (userMetrics?.daysActive || 0)}
            change="Keep tracking!"
            data-testid="stat-days-active"
          />
          <StatsCard 
            icon={TrendingDown}
            title="Global Rank"
            value={metricsLoading ? "..." : `#${userMetrics?.rank || '-'}`}
            change="Your position"
            data-testid="stat-rank"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EcoTrackCard 
            icon={Car}
            title="Travel"
            fields={[
              { name: 'car', label: 'Car Distance', unit: 'km', placeholder: '0' },
              { name: 'bus', label: 'Public Transport', unit: 'km', placeholder: '0' },
              { name: 'flight', label: 'Flight Distance', unit: 'km', placeholder: '0' }
            ]}
            onDataChange={(data) => {
              const travelCarbon = (data.car || 0) * 0.12 + (data.bus || 0) * 0.05 + (data.flight || 0) * 0.25;
              setCarbonData(prev => ({ ...prev, travel: travelCarbon }));
            }}
          />
          <EcoTrackCard 
            icon={UtensilsCrossed}
            title="Diet"
            fields={[
              { name: 'meat', label: 'Meat Meals', unit: 'meals', placeholder: '0' },
              { name: 'veg', label: 'Vegetarian Meals', unit: 'meals', placeholder: '0' },
              { name: 'local', label: 'Local Produce', unit: 'kg', placeholder: '0' }
            ]}
            onDataChange={(data) => {
              const dietCarbon = (data.meat || 0) * 2.5 + (data.veg || 0) * 0.5 - (data.local || 0) * 0.3;
              setCarbonData(prev => ({ ...prev, diet: Math.max(0, dietCarbon) }));
            }}
          />
          <EcoTrackCard 
            icon={Zap}
            title="Electricity"
            fields={[
              { name: 'kwh', label: 'Energy Usage', unit: 'kWh', placeholder: '0' },
              { name: 'renewable', label: 'Renewable %', unit: '%', placeholder: '0' }
            ]}
            onDataChange={(data) => {
              const electricityCarbon = (data.kwh || 0) * 0.5 * (1 - (data.renewable || 0) / 100);
              setCarbonData(prev => ({ ...prev, electricity: electricityCarbon }));
            }}
          />
          <EcoTrackCard 
            icon={Droplets}
            title="Water"
            fields={[
              { name: 'liters', label: 'Water Usage', unit: 'liters', placeholder: '0' },
              { name: 'recycled', label: 'Recycled Water', unit: 'liters', placeholder: '0' }
            ]}
            onDataChange={(data) => {
              const waterCarbon = ((data.liters || 0) - (data.recycled || 0)) * 0.0003;
              setCarbonData(prev => ({ ...prev, water: Math.max(0, waterCarbon) }));
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EcoChart 
            type="doughnut"
            title="Carbon Breakdown"
            data={{
              labels: ['Travel', 'Diet', 'Electricity', 'Water'],
              values: [
                carbonData.travel || 1,
                carbonData.diet || 1,
                carbonData.electricity || 1,
                carbonData.water || 1
              ]
            }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Your Carbon Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Daily Total</span>
                  <span className="text-2xl font-bold text-primary">{totalCarbon.toFixed(1)} kg CO₂</span>
                </div>
                <div className="h-px bg-border" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travel</span>
                    <span className="font-medium">{carbonData.travel.toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Diet</span>
                    <span className="font-medium">{carbonData.diet.toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Electricity</span>
                    <span className="font-medium">{carbonData.electricity.toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Water</span>
                    <span className="font-medium">{carbonData.water.toFixed(1)} kg</span>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="pt-2">
                  <div className="text-sm text-muted-foreground mb-2">Comparison</div>
                  <div className="text-sm">
                    {totalCarbon < 50 ? (
                      <span className="text-primary font-medium">Excellent! You're below average. 🌱</span>
                    ) : totalCarbon < 100 ? (
                      <span className="text-yellow-600 font-medium">Good! Room for improvement. 🌿</span>
                    ) : (
                      <span className="text-orange-600 font-medium">Consider reducing your footprint. 🌍</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={handleSaveData}
            data-testid="button-save-data"
            className="text-lg px-12"
            disabled={isSaving || totalCarbon === 0}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save My Data"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
