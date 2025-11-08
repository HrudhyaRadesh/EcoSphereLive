import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import { BarChart3, Map, Sparkles, Building2, Trophy, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface GlobalStats {
  totalUsers: number;
  totalCo2Saved: number;
  citiesCount: number;
}

export default function HomePage() {
  const { data: globalStats } = useQuery<GlobalStats>({
    queryKey: ["/api/global-stats"],
  });
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">E</span>
            </div>
            <span className="font-bold text-xl">EcoSphere AI</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <Hero 
        onGetStarted={() => window.location.href = '/login'}
        onLearnMore={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Sustainable Living</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to track, optimize, and reduce your environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={BarChart3}
              title="EcoTrack Dashboard"
              description="Monitor your carbon footprint in real-time with interactive charts and personalized insights"
              onClick={() => window.location.href = '/ecotrack'}
            />
            <FeatureCard 
              icon={Map}
              title="Smart Eco Routes"
              description="Find the most sustainable travel routes with live CO₂ calculations and eco scores"
              onClick={() => window.location.href = '/routes'}
            />
            <FeatureCard 
              icon={Sparkles}
              title="AI Green Designer"
              description="Get AI-powered recommendations for sustainable home layouts and eco-friendly products"
              onClick={() => window.location.href = '/designer'}
            />
            <FeatureCard 
              icon={Building2}
              title="Urban Insights"
              description="Explore city-level sustainability data and contribute to community environmental goals"
              onClick={() => window.location.href = '/urban'}
            />
            <FeatureCard 
              icon={Trophy}
              title="Gamification Zone"
              description="Earn green points, unlock badges, and compete on the global sustainability leaderboard"
              onClick={() => window.location.href = '/gamification'}
            />
            <FeatureCard 
              icon={LogIn}
              title="Personalized Profile"
              description="Save your progress, track your journey, and see your environmental impact over time"
              onClick={() => window.location.href = '/login'}
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Make Every Action Count</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Join thousands of users worldwide who are making a difference. Track your carbon footprint, 
                discover sustainable alternatives, and see the real impact of your eco-friendly choices.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Real-time Calculations</h3>
                    <p className="text-muted-foreground">Instant carbon footprint updates as you input your daily activities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI-Powered Insights</h3>
                    <p className="text-muted-foreground">Smart recommendations tailored to your lifestyle and goals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community Impact</h3>
                    <p className="text-muted-foreground">See how your actions contribute to global sustainability goals</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-bold text-primary mb-2" data-testid="text-global-co2">
                      {globalStats 
                        ? `${globalStats.totalCo2Saved >= 1000 
                            ? `${(globalStats.totalCo2Saved / 1000).toFixed(1)}k` 
                            : globalStats.totalCo2Saved.toFixed(1)} kg` 
                        : "0 kg"}
                    </div>
                    <div className="text-xl text-muted-foreground">CO₂ Saved</div>
                    <div className="text-sm text-muted-foreground mt-2">by our community</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Eco Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community and make a positive impact on the environment today
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg px-8" data-testid="button-cta-signup">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 EcoSphere AI. Building a sustainable future together.</p>
        </div>
      </footer>
    </div>
  );
}
