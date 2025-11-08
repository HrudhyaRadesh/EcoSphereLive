import AddActivityDialog from '../AddActivityDialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AddActivityDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AddActivityDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(activity) => console.log('Activity submitted:', activity)}
      />
    </div>
  );
}
