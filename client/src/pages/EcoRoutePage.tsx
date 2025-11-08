import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthNavbar from "@/components/AuthNavbar";
import { Navigation, Loader2, Footprints, Bike, Bus, Car, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type RouteComparison = {
  mode: string;
  icon: any;
  duration: number;
  co2Emissions: number;
  ecoScore: number;
  color: string;
};

export default function EcoRoutePage() {
  const [distance, setDistance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState<RouteComparison[]>([]);
  const { toast } = useToast();

  const calculateRoutes = async () => {
    if (!distance || parseFloat(distance) <= 0) {
      toast({
        title: "Invalid distance",
        description: "Please enter a valid distance in kilometers",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const distanceKm = parseFloat(distance);
      
      // Call backend API to calculate all routes
      const response = await apiRequest("POST", "/api/routes/compare", {
        distance: distanceKm,
      });

      const data = await response.json();
      setRoutes(data.routes);

      toast({
        title: "Routes calculated!",
        description: `Compared ${data.routes.length} transport modes for ${distanceKm} km`,
      });
    } catch (error: any) {
      console.error("Error calculating routes:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to calculate routes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getIconComponent = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'walk':
        return Footprints;
      case 'bike':
        return Bike;
      case 'bus':
        return Bus;
      case 'car':
        return Car;
      default:
        return Navigation;
    }
  };

  const getIconColor = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'walk':
        return 'bg-green-100 text-green-600';
      case 'bike':
        return 'bg-green-100 text-green-600';
      case 'bus':
        return 'bg-teal-100 text-teal-600';
      case 'car':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const carEmissions = routes.find(r => r.mode.toLowerCase() === 'car')?.co2Emissions || 0;
  const bestEmissions = Math.min(...routes.map(r => r.co2Emissions));
  const savings = carEmissions - bestEmissions;

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar title="Smart Eco Route Finder" icon={Navigation} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Smart Eco Route Finder</h1>
          <p className="text-muted-foreground text-lg">
            Compare transport modes and find the most eco-friendly route
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Details Input */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Route Details</CardTitle>
                <p className="text-sm text-muted-foreground">Enter your journey information</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input 
                    id="distance"
                    type="number"
                    placeholder="50"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    data-testid="input-distance"
                    disabled={isLoading}
                    min="0"
                    step="0.1"
                  />
                </div>
                <Button 
                  className="w-full"
                  onClick={calculateRoutes}
                  data-testid="button-calculate-routes"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Calculate Routes"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Route Comparison Cards */}
          <div className="lg:col-span-2 space-y-4">
            {routes.length > 0 ? (
              <>
                {routes.map((route, index) => {
                  const IconComponent = getIconComponent(route.mode);
                  const iconColor = getIconColor(route.mode);
                  
                  return (
                    <Card key={index} className="hover-elevate" data-testid={`route-card-${route.mode.toLowerCase()}`}>
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${iconColor}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold capitalize" data-testid={`mode-${route.mode.toLowerCase()}`}>
                              {route.mode}
                            </h3>
                            <p className="text-sm text-muted-foreground" data-testid={`duration-${route.mode.toLowerCase()}`}>
                              {Math.round(route.duration)} min
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-3xl font-bold" data-testid={`co2-${route.mode.toLowerCase()}`}>
                              {route.co2Emissions.toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground">kg CO₂</p>
                          </div>
                          <Badge 
                            variant={route.ecoScore >= 80 ? "default" : route.ecoScore >= 50 ? "secondary" : "outline"}
                            className="text-sm px-3 py-1"
                            data-testid={`score-${route.mode.toLowerCase()}`}
                          >
                            <Leaf className="h-3 w-3 mr-1" />
                            {route.ecoScore}
                            <span className="ml-1 text-xs">Eco Score</span>
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Environmental Impact Card */}
                {savings > 0 && (
                  <Card className="bg-primary text-primary-foreground" data-testid="environmental-impact">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary-foreground/20">
                          <Leaf className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Environmental Impact</h3>
                          <p className="text-primary-foreground/90">
                            Walking or biking saves <span className="font-bold">{savings.toFixed(2)} kg CO₂</span> compared to driving
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Navigation className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Compare Routes</h3>
                  <p className="text-muted-foreground">
                    Enter a distance and click "Calculate Routes" to see eco-friendly options
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
