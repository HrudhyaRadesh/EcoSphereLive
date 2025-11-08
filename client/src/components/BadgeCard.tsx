import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BadgeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked: boolean;
  date?: string;
}

export default function BadgeCard({ icon: Icon, title, description, unlocked, date }: BadgeCardProps) {
  return (
    <Card 
      className={`transition-all duration-300 ${unlocked ? 'hover-elevate' : 'opacity-50'}`}
      data-testid={`badge-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-6 text-center">
        <div className={`h-20 w-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
          unlocked ? 'bg-primary animate-scale-in' : 'bg-muted'
        }`}>
          <Icon className={`h-10 w-10 ${unlocked ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        {unlocked && date && (
          <Badge variant="secondary" className="text-xs">
            Unlocked {date}
          </Badge>
        )}
        {!unlocked && (
          <Badge variant="outline" className="text-xs">
            Locked
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
