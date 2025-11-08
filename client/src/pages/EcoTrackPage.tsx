import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EcoTrackCard from "@/components/EcoTrackCard";
import EcoChart from "@/components/EcoChart";
import StatsCard from "@/components/StatsCard";
import AuthNavbar from "@/components/AuthNavbar";
import { Car, UtensilsCrossed, Zap, Droplets, TrendingDown, Calendar, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EcoTrackPage() {
  const { toast } = useToast();
  const [carbonData, setCarbonData] = useState({
    travel: 0,
    diet: 0,
    electricity: 0,
    water: 0,
  });

  const totalCarbon = Object.values(carbonData).reduce((sum, val) => sum + val, 0);

  const handleSaveData = () => {
    localStorage.setItem('carbonData', JSON.stringify(carbonData));
    localStorage.setItem('carbonDataDate', new Date().toISOString());
    toast({
      title: "Data Saved!",
      description: `Your carbon footprint of ${totalCarbon.toFixed(1)} kg has been saved.`,
    });
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
            title="Total Carbon"
            value={`${totalCarbon.toFixed(1)} kg`}
            change="Updated just now"
          />
          <StatsCard 
            icon={Calendar}
            title="This Month"
            value={`${(totalCarbon * 30).toFixed(0)} kg`}
            change="-8% from last month"
            trend="down"
          />
          <StatsCard 
            icon={Leaf}
            title="Trees Needed"
            value={Math.ceil(totalCarbon / 21)}
            change="To offset your footprint"
          />
          <StatsCard 
            icon={TrendingDown}
            title="Eco Score"
            value={Math.max(0, 100 - Math.floor(totalCarbon / 10))}
            change={totalCarbon < 100 ? "Excellent!" : "Can improve"}
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
          >
            Save My Data
          </Button>
        </div>
      </div>
    </div>
  );
}
