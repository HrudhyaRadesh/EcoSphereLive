import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function FeatureCard({ icon: Icon, title, description, onClick }: FeatureCardProps) {
  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all duration-300"
      onClick={onClick}
      data-testid={`card-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
