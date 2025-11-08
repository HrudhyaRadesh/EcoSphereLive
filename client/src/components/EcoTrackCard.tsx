import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface EcoTrackCardProps {
  icon: LucideIcon;
  title: string;
  fields: { name: string; label: string; unit: string; placeholder?: string }[];
  onDataChange?: (data: Record<string, number>) => void;
}

export default function EcoTrackCard({ icon: Icon, title, fields, onDataChange }: EcoTrackCardProps) {
  const [data, setData] = useState<Record<string, number>>({});

  const handleChange = (fieldName: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newData = { ...data, [fieldName]: numValue };
    setData(newData);
    onDataChange?.(newData);
  };

  return (
    <Card data-testid={`card-ecotrack-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <div className="relative">
              <Input
                id={field.name}
                type="number"
                placeholder={field.placeholder || "0"}
                value={data[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                data-testid={`input-${field.name}`}
                className="pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {field.unit}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
