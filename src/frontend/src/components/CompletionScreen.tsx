import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResultsSummary from './ResultsSummary';
import { RotateCcw, Trophy, Sparkles, ArrowRight } from 'lucide-react';

interface CompletionScreenProps {
  answers: Array<'yes' | 'no' | undefined>;
  onRestart: () => void;
  onNavigateToContact: () => void;
}

export default function CompletionScreen({ answers, onRestart, onNavigateToContact }: CompletionScreenProps) {
  const validAnswers = answers.filter((a): a is 'yes' | 'no' => a !== undefined);
  const yesCount = validAnswers.filter((a) => a === 'yes').length;

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in scale-in duration-700">
      {/* Background pattern for completion screen */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 geo-pattern-bg" />
      </div>

      <Card className="relative border-4 border-primary/30 shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-card via-primary/5 to-accent/5">
        <div className="absolute top-0 right-0 w-96 h-96 corner-ornament opacity-5" style={{ backgroundPosition: 'top right' }} />
        
        <CardHeader className="text-center space-y-6 pb-8 pt-12 relative z-10">
          <div className="flex justify-center animate-in scale-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
              <div className="relative rounded-full bg-gradient-to-br from-primary to-accent p-6 shadow-glow-lg">
                <Trophy className="w-20 h-20 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-2 border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">Assessment Complete</span>
            </div>
            <CardTitle className="text-4xl md:text-5xl font-display font-bold gradient-text">
              Congratulations!
            </CardTitle>
            <p className="text-2xl md:text-3xl text-muted-foreground font-semibold">
              आपने आकलन पूरा करने के लिए धन्यवाद!
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-10 pb-12 relative z-10">
          <div className="text-center space-y-4 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/20">
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              You answered <span className="font-display font-bold text-primary text-4xl mx-2">{yesCount}</span> out
              of <span className="font-display font-bold text-foreground text-4xl mx-2">{validAnswers.length}</span> questions with "Yes"
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-8 md:p-10 space-y-8 border-2 border-primary/20 shadow-xl">
            <div className="space-y-4 text-center">
              <h3 className="text-3xl md:text-4xl font-display font-bold gradient-text">Ready to Transform Your Future?</h3>
              <p className="text-xl md:text-2xl text-foreground font-semibold">
                Join our next training batch and become a Certified Financial Advisor
              </p>
              <p className="text-lg md:text-xl text-muted-foreground font-medium">
                हमारे अगले ट्रेनिंग बैच में शामिल हों और एक सर्टिफाइड फाइनेंशियल एडवाइजर बनें
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                size="lg" 
                onClick={onNavigateToContact}
                className="text-xl font-bold h-16 px-10 rounded-2xl shadow-glow-lg pulse-glow group hover:scale-105 transition-transform duration-300"
              >
                Contact Us
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onRestart}
                className="text-xl font-bold h-16 px-10 rounded-2xl border-2 hover:scale-105 transition-transform duration-300"
              >
                <RotateCcw className="w-6 h-6 mr-3" />
                Start Over
              </Button>
            </div>
          </div>

          <ResultsSummary answers={validAnswers} />
        </CardContent>
      </Card>
    </div>
  );
}
