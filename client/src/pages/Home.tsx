import { useState } from "react";
import { Users, Leaf, Globe, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import MetricCard from "@/components/MetricCard";
import ActivityCard from "@/components/ActivityCard";
import PersonalImpact from "@/components/PersonalImpact";
import AddActivityDialog from "@/components/AddActivityDialog";
import ThemeToggle from "@/components/ThemeToggle";
import recyclingIcon from '@assets/generated_images/Recycling_activity_icon_e6183701.png';
import bikingIcon from '@assets/generated_images/Biking_activity_icon_c9c89be0.png';
import plantingIcon from '@assets/generated_images/Tree_planting_activity_icon_4be35a62.png';

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const mockActivities = [
    {
      type: "Recycling",
      description: "Recycled 5kg of plastic and paper waste",
      co2Saved: 2.3,
      pointsEarned: 50,
      timestamp: "2 hours ago",
      icon: recyclingIcon,
    },
    {
      type: "Biking",
      description: "Cycled 15km instead of driving",
      co2Saved: 3.5,
      pointsEarned: 75,
      timestamp: "5 hours ago",
      icon: bikingIcon,
    },
    {
      type: "Planting",
      description: "Planted 3 trees in local community garden",
      co2Saved: 12.0,
      pointsEarned: 200,
      timestamp: "1 day ago",
      icon: plantingIcon,
    },
  ];

  const handleAddActivity = (activity: { type: string; description: string; co2Saved: number }) => {
    console.log("New activity added:", activity);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-serif font-bold" data-testid="text-app-title">
                EcoSphere
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-md">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium" data-testid="text-header-points">
                  12,450 points
                </span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <Hero totalCO2Saved={34.7} onAddActivity={() => setDialogOpen(true)} />

          <section>
            <h2 className="text-2xl font-serif font-semibold mb-6" data-testid="text-section-global-impact">
              Global Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard icon={Users} label="Active Users" value={1247} trend="up" />
              <MetricCard icon={Leaf} label="Tons of CO2 Saved" value={34.7} unit="tons" decimals={1} trend="up" />
              <MetricCard icon={Globe} label="Cities Worldwide" value={89} trend="up" />
              <MetricCard icon={Sparkles} label="Total Green Points" value={245890} />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-serif font-semibold" data-testid="text-section-recent-activities">
                Recent Activities
              </h2>
              <div className="space-y-4">
                {mockActivities.map((activity, index) => (
                  <ActivityCard key={index} {...activity} />
                ))}
              </div>
            </div>

            <div>
              <PersonalImpact
                yourCO2Saved={8.4}
                thisMonthCO2={5.2}
                lastMonthCO2={4.1}
                achievements={['First Tree', 'Eco Warrior', '50 Points']}
              />
            </div>
          </div>
        </div>
      </main>

      <AddActivityDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddActivity}
      />
    </div>
  );
}
