import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EcoChart from "@/components/EcoChart";
import StatsCard from "@/components/StatsCard";
import AuthNavbar from "@/components/AuthNavbar";
import { Building2, Users, TrendingDown, Zap, Leaf } from "lucide-react";

export default function UrbanDashboardPage() {
  const [selectedCity, setSelectedCity] = useState("bengaluru");

  const cityData = {
    "bengaluru": {
      name: "Bengaluru",
      users: "--",
      avgCarbon: "--",
      topCategory: "--",
      reduction: "--",
      categories: {
        labels: ["Travel", "Diet", "Electricity", "Water"],
        values: [1, 1, 1, 1]
      }
    },
    "delhi": {
      name: "Delhi",
      users: "--",
      avgCarbon: "--",
      topCategory: "--",
      reduction: "--",
      categories: {
        labels: ["Travel", "Diet", "Electricity", "Water"],
        values: [1, 1, 1, 1]
      }
    },
    "mumbai": {
      name: "Mumbai",
      users: "--",
      avgCarbon: "--",
      topCategory: "--",
      reduction: "--",
      categories: {
        labels: ["Travel", "Diet", "Electricity", "Water"],
        values: [1, 1, 1, 1]
      }
    },
    "chennai": {
      name: "Chennai",
      users: "--",
      avgCarbon: "--",
      topCategory: "--",
      reduction: "--",
      categories: {
        labels: ["Travel", "Diet", "Electricity", "Water"],
        values: [1, 1, 1, 1]
      }
    },
    "hyderabad": {
      name: "Hyderabad",
      users: "--",
      avgCarbon: "--",
      topCategory: "--",
      reduction: "--",
      categories: {
        labels: ["Travel", "Diet", "Electricity", "Water"],
        values: [1, 1, 1, 1]
      }
    },
    "kolkata": {
      name: "Kolkata",
      users: "--",
      avgCarbon: "--",
      topCategory: "--",
      reduction: "--",
      categories: {
        labels: ["Travel", "Diet", "Electricity", "Water"],
        values: [1, 1, 1, 1]
      }
    }
  };

  const currentCity = cityData[selectedCity as keyof typeof cityData];

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar title="Urban Insights (India)" icon={Building2} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Indian Cities Sustainability Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Explore aggregated environmental data and insights from Indian cities
            </p>
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger data-testid="select-city">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bengaluru">Bengaluru</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="kolkata">Kolkata</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            icon={Users}
            title="Active Users"
            value={currentCity.users}
            change="Coming Soon"
          />
          <StatsCard 
            icon={TrendingDown}
            title="Avg Carbon"
            value={`${currentCity.avgCarbon} kg`}
            change="per user/month"
          />
          <StatsCard 
            icon={Zap}
            title="Top Category"
            value={currentCity.topCategory}
            change="highest impact"
          />
          <StatsCard 
            icon={Leaf}
            title="Reduction"
            value={`${currentCity.reduction}%`}
            change="from last year"
            trend="down"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EcoChart 
            type="bar"
            title={`${currentCity.name} - Category Breakdown`}
            data={currentCity.categories}
          />
          <EcoChart 
            type="doughnut"
            title={`${currentCity.name} - Distribution`}
            data={currentCity.categories}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>City Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Carbon Reduction Trend</h3>
                    <p className="text-sm text-muted-foreground">
                      Data for {currentCity.name} will be available soon. We're working on aggregating sustainability metrics 
                      from across the city to provide you with meaningful insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community Engagement</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentCity.name}'s sustainability community is growing. Join other eco-warriors in tracking 
                      and reducing your environmental impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Top Impact Area</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentCity.topCategory} contributes the most to carbon emissions in {currentCity.name}. 
                      Focus on sustainable alternatives in this category for maximum impact.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["January", "February", "March"].map((month) => (
                  <div key={month}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{month}</span>
                      <span className="font-medium">--</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-muted transition-all duration-500"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-sm text-muted-foreground mb-1">Total CO₂ Saved</div>
                <div className="text-2xl font-bold text-primary">
                  --
                </div>
                <div className="text-xs text-muted-foreground mt-1">Coming Soon</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations for {currentCity.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Expand Public Transit</h3>
                <p className="text-sm text-muted-foreground">
                  Investing in more public transportation routes could reduce city-wide carbon by an additional 12%
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Green Building Incentives</h3>
                <p className="text-sm text-muted-foreground">
                  Encourage renewable energy adoption in buildings to lower electricity-based emissions
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Community Programs</h3>
                <p className="text-sm text-muted-foreground">
                  Launch local sustainability challenges to increase user engagement and environmental awareness
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
