import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AuthNavbar from "@/components/AuthNavbar";
import { Sparkles, Home, Leaf, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GreenDesignerPage() {
  const [budget, setBudget] = useState(5000);
  const [lifestyle, setLifestyle] = useState("");
  const [climate, setClimate] = useState("");
  const [preferences, setPreferences] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSuggestions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setSuggestions([
        {
          title: "Solar Panel Installation",
          description: "Install 5kW solar panels on your roof to reduce electricity bills by 70% and carbon emissions significantly.",
          sustainability: 95,
          cost: budget * 0.4,
          category: "Energy"
        },
        {
          title: "Smart Home Thermostat",
          description: "Programmable thermostat that learns your schedule and optimizes heating/cooling for maximum efficiency.",
          sustainability: 85,
          cost: budget * 0.05,
          category: "Automation"
        },
        {
          title: "Rainwater Harvesting System",
          description: "Collect and store rainwater for garden irrigation and non-potable uses, saving up to 40% on water bills.",
          sustainability: 90,
          cost: budget * 0.15,
          category: "Water"
        },
        {
          title: "LED Lighting Upgrade",
          description: "Replace all traditional bulbs with energy-efficient LED lights throughout your home.",
          sustainability: 80,
          cost: budget * 0.08,
          category: "Energy"
        },
        {
          title: "Compost System",
          description: "Install an indoor/outdoor composting system to reduce waste and create nutrient-rich soil for your garden.",
          sustainability: 88,
          cost: budget * 0.03,
          category: "Waste"
        },
        {
          title: "Green Roof Garden",
          description: "Transform your roof into a living garden that improves insulation and air quality while growing fresh produce.",
          sustainability: 92,
          cost: budget * 0.25,
          category: "Infrastructure"
        }
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar title="AI Green Designer" icon={Sparkles} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI-Powered Sustainable Design</h1>
          <p className="text-muted-foreground text-lg">
            Get personalized recommendations for eco-friendly home improvements and products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Your Preferences</CardTitle>
              <CardDescription>Tell us about your sustainability goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget: ${budget.toLocaleString()}</Label>
                <Input 
                  id="budget"
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  data-testid="input-budget"
                />
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>$1,000</span>
                  <span>$50,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lifestyle">Lifestyle</Label>
                <Select value={lifestyle} onValueChange={setLifestyle}>
                  <SelectTrigger id="lifestyle" data-testid="select-lifestyle">
                    <SelectValue placeholder="Select your lifestyle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="family">Family-oriented</SelectItem>
                    <SelectItem value="urban">Urban Professional</SelectItem>
                    <SelectItem value="rural">Rural Living</SelectItem>
                    <SelectItem value="eco">Eco-conscious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="climate">Climate Zone</Label>
                <Select value={climate} onValueChange={setClimate}>
                  <SelectTrigger id="climate" data-testid="select-climate">
                    <SelectValue placeholder="Select your climate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tropical">Tropical</SelectItem>
                    <SelectItem value="temperate">Temperate</SelectItem>
                    <SelectItem value="cold">Cold</SelectItem>
                    <SelectItem value="arid">Arid/Desert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferences">Additional Preferences</Label>
                <Textarea 
                  id="preferences"
                  placeholder="Tell us more about your goals, space, or specific needs..."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  data-testid="input-preferences"
                  rows={4}
                />
              </div>

              <Button 
                className="w-full"
                onClick={generateSuggestions}
                disabled={isGenerating}
                data-testid="button-generate"
              >
                {isGenerating ? "Generating..." : "Generate Recommendations"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            {suggestions.length === 0 ? (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center p-12">
                  <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
                  <p className="text-muted-foreground">
                    Fill in your preferences and click generate to receive AI-powered sustainable living recommendations
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Your Recommendations</h2>
                  <Badge variant="secondary">
                    {suggestions.length} suggestions
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestions.map((suggestion, index) => (
                    <Card key={index} className="hover-elevate animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {suggestion.category === "Energy" ? <Leaf className="h-5 w-5 text-primary" /> : <Home className="h-5 w-5 text-primary" />}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Sustainability Score</span>
                            <span className="font-medium text-primary">{suggestion.sustainability}/100</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-500"
                              style={{ width: `${suggestion.sustainability}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Estimated Cost</span>
                          <span className="font-bold">${suggestion.cost.toLocaleString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
