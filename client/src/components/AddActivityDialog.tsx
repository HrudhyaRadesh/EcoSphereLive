import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface AddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (activity: {
    type: string;
    description: string;
    co2Saved: number;
  }) => void;
}

export default function AddActivityDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddActivityDialogProps) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [co2Saved, setCo2Saved] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type && description && co2Saved) {
      onSubmit({
        type,
        description,
        co2Saved: parseFloat(co2Saved),
      });
      setType("");
      setDescription("");
      setCo2Saved("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-add-activity">
        <DialogHeader>
          <DialogTitle>Log Eco-Friendly Activity</DialogTitle>
          <DialogDescription>
            Record your environmental action and earn green points.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Activity Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type" data-testid="select-activity-type">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recycling">Recycling</SelectItem>
                  <SelectItem value="Biking">Biking</SelectItem>
                  <SelectItem value="Planting">Planting</SelectItem>
                  <SelectItem value="Energy">Energy Saving</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Describe your eco-friendly action"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-testid="input-activity-description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="co2">CO₂ Saved (kg)</Label>
              <Input
                id="co2"
                type="number"
                step="0.1"
                placeholder="0.0"
                value={co2Saved}
                onChange={(e) => setCo2Saved(e.target.value)}
                data-testid="input-activity-co2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel-activity"
            >
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit-activity">
              Log Activity
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
