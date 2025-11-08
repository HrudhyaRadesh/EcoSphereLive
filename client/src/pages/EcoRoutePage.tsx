import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EcoMap from "@/components/EcoMap";
import AuthNavbar from "@/components/AuthNavbar";
import { MapPin, Navigation, TrendingDown, Award, Leaf, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function EcoRoutePage() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [isLoading, setIsLoading] = useState(false);
  const [routeData, setRouteData] = useState<{
    distance: number;
    duration: number;
    co2Emissions: number;
    ecoScore: number;
    vehicleType: string;
  } | null>(null);
  const [mapPoints, setMapPoints] = useState<{
    start?: [number, number];
    end?: [number, number];
    geometry?: any;
  }>({});
  const { toast } = useToast();

  // Geocode an address to lat/lng using Nominatim (OpenStreetMap)
  const geocodeAddress = async (address: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
    );
    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error(`Location not found: ${address}`);
    }
    
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  };

  const calculateRoute = async () => {
    if (!startLocation || !endLocation) {
      toast({
        title: "Missing information",
        description: "Please enter both start and end locations",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Geocode both addresses
      const origin = await geocodeAddress(startLocation);
      const destination = await geocodeAddress(endLocation);

      // Call backend API to calculate route
      const response = await apiRequest("/api/routes/calculate", {
        method: "POST",
        body: JSON.stringify({
          origin,
          destination,
          vehicleType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to calculate route");
      }

      setRouteData(data.route);
      setMapPoints({
        start: [origin.lat, origin.lng],
        end: [destination.lat, destination.lng],
        geometry: data.route.geometry,
      });

      toast({
        title: "Route calculated!",
        description: `Found an eco-friendly route of ${data.route.distance.toFixed(1)} km`,
      });
    } catch (error: any) {
      console.error("Error calculating route:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to calculate route",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar title="Smart Eco Routes" icon={Navigation} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Your Eco-Friendly Route</h1>
          <p className="text-muted-foreground text-lg">
            Discover the most sustainable way to travel with live CO₂ calculations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EcoMap 
              startPoint={mapPoints.start}
              endPoint={mapPoints.end}
              routeGeometry={mapPoints.geometry}
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Route Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="start">Start Location</Label>
                  <Input 
                    id="start"
                    placeholder="e.g., New York, NY or Times Square"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    data-testid="input-start-location"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Location</Label>
                  <Input 
                    id="end"
                    placeholder="e.g., Brooklyn, NY or Central Park"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    data-testid="input-end-location"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle Type</Label>
                  <Select value={vehicleType} onValueChange={setVehicleType} disabled={isLoading}>
                    <SelectTrigger id="vehicle" data-testid="select-vehicle-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car (Gasoline)</SelectItem>
                      <SelectItem value="electric">Electric Vehicle</SelectItem>
                      <SelectItem value="bus">Public Bus</SelectItem>
                      <SelectItem value="bike">Bicycle</SelectItem>
                      <SelectItem value="walk">Walking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full"
                  onClick={calculateRoute}
                  data-testid="button-calculate-route"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Calculate Eco Route"
                  )}
                </Button>
              </CardContent>
            </Card>

            {routeData && (
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    Route Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Distance</div>
                    <div className="text-2xl font-bold">{routeData.distance.toFixed(1)} km</div>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      CO₂ Emissions
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {routeData.co2Emissions.toFixed(2)} kg
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Eco Score
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-bold text-primary">{routeData.ecoScore}</div>
                      <Badge 
                        variant={routeData.ecoScore >= 80 ? "default" : "secondary"}
                        className="text-sm"
                      >
                        {routeData.ecoScore >= 80 ? "Excellent" : "Good"}
                      </Badge>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden mt-2">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${routeData.ecoScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="text-sm space-y-2">
                    <div className="font-medium">Route Details</div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Mode</span>
                      <span className="text-foreground capitalize">{routeData.vehicleType}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Estimated Time</span>
                      <span className="text-foreground">{Math.ceil(routeData.duration)} min</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Green Points</span>
                      <span className="text-primary font-medium">+{Math.ceil((100 - routeData.co2Emissions) * 10)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">💡 Eco Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Choose public transit over personal vehicles when possible</p>
                <p>• Walking and cycling are the most eco-friendly options</p>
                <p>• Carpooling can reduce your carbon footprint by up to 50%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
