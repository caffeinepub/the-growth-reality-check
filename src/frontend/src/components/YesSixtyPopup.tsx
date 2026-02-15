import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface YesSixtyPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function YesSixtyPopup({ open, onOpenChange }: YesSixtyPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl border-4 border-primary/30 shadow-2xl bg-gradient-to-br from-card via-primary/5 to-accent/5">
        <DialogHeader className="space-y-6 pt-4">
          <div className="mx-auto relative animate-in scale-in duration-500">
            <div className="absolute inset-0 rounded-full bg-success/20 blur-2xl animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center shadow-glow-lg">
              <CheckCircle2 className="w-14 h-14 text-white" />
            </div>
          </div>
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border-2 border-success/20">
                <Sparkles className="w-4 h-4 text-success" />
                <span className="text-sm font-bold text-success uppercase tracking-wide">Excellent Progress</span>
              </div>
            </div>
            <DialogTitle className="text-center text-4xl font-display font-bold gradient-text">
              Great!
            </DialogTitle>
            <DialogDescription className="text-center text-xl font-bold text-foreground">
              Let's get your registration done right now.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex justify-center pt-6 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '400ms' }}>
          <Button
            onClick={() => onOpenChange(false)}
            size="lg"
            className="px-12 h-14 text-lg font-bold rounded-2xl shadow-glow-md pulse-glow hover:scale-105 transition-transform duration-300"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
