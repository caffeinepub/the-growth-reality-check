import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface AxisMaxLifeHeaderProps {
  onNavigateToContact: () => void;
  onNavigateToQuestionnaire: () => void;
  currentView: 'questionnaire' | 'completion' | 'contact';
}

export default function AxisMaxLifeHeader({ 
  onNavigateToContact, 
  onNavigateToQuestionnaire,
  currentView 
}: AxisMaxLifeHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-primary/20 bg-card/95 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={onNavigateToQuestionnaire}
            className="focus:outline-none focus:ring-4 focus:ring-primary/30 rounded-xl transition-all duration-300 hover:scale-105 transform"
          >
            <img
              src="/assets/generated/axis-max-life-logo.dim_1200x300.png"
              alt="Axis Max Life"
              className="h-10 md:h-12 w-auto drop-shadow-lg"
            />
          </button>
          <nav>
            <Button
              variant={currentView === 'contact' ? 'default' : 'outline'}
              onClick={onNavigateToContact}
              size="lg"
              className={`font-bold text-base rounded-2xl transition-all duration-300 ${
                currentView === 'contact' 
                  ? 'shadow-glow-md pulse-glow' 
                  : 'hover:scale-105 hover:shadow-lg'
              }`}
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
