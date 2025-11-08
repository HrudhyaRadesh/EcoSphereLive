import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import heroBackground from '@assets/generated_images/Forest_canopy_hero_background_41204464.png';

interface HeroProps {
  totalCO2Saved: number;
  onAddActivity: () => void;
}

export default function Hero({ totalCO2Saved, onAddActivity }: HeroProps) {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden rounded-md">
      <img 
        src={heroBackground} 
        alt="Forest canopy" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4" data-testid="text-hero-title">
          Your Impact on the Planet
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl" data-testid="text-hero-subtitle">
          Together we're making a difference, one action at a time
        </p>
        
        <div className="bg-white/10 backdrop-blur-md rounded-md px-8 py-6 mb-8 border border-white/20">
          <p className="text-sm text-white/80 mb-2">Total CO₂ Saved</p>
          <p className="text-6xl font-serif font-bold text-white" data-testid="text-hero-co2-total">
            {totalCO2Saved.toFixed(1)}<span className="text-3xl ml-2">tons</span>
          </p>
        </div>
        
        <Button 
          size="lg"
          variant="outline"
          className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
          onClick={onAddActivity}
          data-testid="button-add-activity"
        >
          <Plus className="w-5 h-5 mr-2" />
          Log Eco-Friendly Activity
        </Button>
      </div>
    </div>
  );
}
