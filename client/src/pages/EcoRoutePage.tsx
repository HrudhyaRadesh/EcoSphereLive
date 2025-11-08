import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EcoMap from "@/components/EcoMap";
import AuthNavbar from "@/components/AuthNavbar";
import { MapPin, Navigation, TrendingDown, Award, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EcoRoutePage() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [routeData, setRouteData] = useState<{
    distance: number;
    co2Saved: number;
    ecoScore: number;
  } | null>(null);
  const [mapPoints, setMapPoints] = useState<{
    start?: [number, number];
    end?: [number, number];
  }>({});

  const calculateRoute = () => {
    const mockDistance = Math.random() * 20 + 5;
    const mockCO2Saved = mockDistance * 0.12;
    const mockEcoScore = Math.floor(Math.random() * 30) + 70;

    setRouteData({
      distance: mockDistance,
      co2Saved: mockCO2Saved,
      ecoScore: mockEcoScore,
    });

    setMapPoints({
      start: [51.505, -0.09],
      end: [51.515, -0.08],
    });
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
                    placeholder="Enter starting point"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    data-testid="input-start-location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Location</Label>
                  <Input 
                    id="end"
                    placeholder="Enter destination"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    data-testid="input-end-location"
                  />
                </div>
                <Button 
                  className="w-full"
                  onClick={calculateRoute}
                  data-testid="button-calculate-route"
                >
                  Calculate Eco Route
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
                      CO₂ Saved vs. Car
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {routeData.co2Saved.toFixed(2)} kg
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
                      <span className="text-foreground">Public Transit</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Estimated Time</span>
                      <span className="text-foreground">{Math.ceil(routeData.distance * 2)} min</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Green Points</span>
                      <span className="text-primary font-medium">+{Math.ceil(routeData.co2Saved * 10)}</span>
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
