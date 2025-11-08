import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from '@assets/generated_images/Sustainable_city_hero_image_f882d23b.png'
import GlobalStatsDisplay from "./GlobalStatsDisplay"

interface HeroProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

export default function Hero({ onGetStarted, onLearnMore }: HeroProps) {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up font-[family-name:var(--font-sans)]">
          Your Journey to a
          <span className="block text-primary-foreground bg-primary px-4 py-2 mt-2 inline-block rounded-lg">
            Sustainable Future
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Track your carbon footprint, discover eco-friendly routes, and get AI-powered sustainability recommendations
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Button 
            size="lg" 
            variant="default"
            onClick={onGetStarted}
            data-testid="button-get-started"
            className="text-lg px-8"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={onLearnMore}
            data-testid="button-learn-more"
            className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            Learn More
          </Button>
        </div>

        <GlobalStatsDisplay />
      </div>
    </div>
  );
}
