import { useState, useEffect } from 'react';
import { questions } from '../content/questions.axisMaxLife';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, RotateCcw, TrendingUp } from 'lucide-react';
import YesSixtyPopup from './YesSixtyPopup';
import HeroBanner from './HeroBanner';

interface QuestionnaireFlowProps {
  answers: Array<'yes' | 'no' | undefined>;
  onAnswer: (index: number, answer: 'yes' | 'no') => void;
  onStartOver: () => void;
  yes60PopupShown: boolean;
  onMarkYes60PopupShown: () => void;
}

export default function QuestionnaireFlow({
  answers,
  onAnswer,
  onStartOver,
  yes60PopupShown,
  onMarkYes60PopupShown,
}: QuestionnaireFlowProps) {
  const answeredCount = answers.filter((a) => a !== undefined).length;
  const [showYes60Popup, setShowYes60Popup] = useState(false);

  // Calculate yes count and check for 60% threshold
  useEffect(() => {
    const yesCount = answers.filter((a) => a === 'yes').length;
    const totalQuestions = questions.length;
    const threshold = Math.ceil(0.6 * totalQuestions); // 60% threshold

    // Show popup if threshold reached and not already shown
    if (yesCount >= threshold && !yes60PopupShown && !showYes60Popup) {
      setShowYes60Popup(true);
      onMarkYes60PopupShown();
    }
  }, [answers, yes60PopupShown, showYes60Popup, onMarkYes60PopupShown]);

  const handlePopupClose = (open: boolean) => {
    setShowYes60Popup(open);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <YesSixtyPopup open={showYes60Popup} onOpenChange={handlePopupClose} />
      
      <HeroBanner
        title="Financial Advisor Assessment"
        subtitle="Start Your Journey"
        description="Discover if you have what it takes to become a successful Financial Advisor"
      />

      <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/20 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-glow-md">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Progress</p>
              <p className="text-2xl font-display font-bold text-foreground">
                {answeredCount} <span className="text-lg text-muted-foreground">of {questions.length}</span>
              </p>
            </div>
          </div>
          {answeredCount > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={onStartOver}
              className="font-bold rounded-xl hover:scale-105 transition-transform duration-300 border-2"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Start Over
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => {
          const selectedAnswer = answers[index];
          
          return (
            <Card 
              key={index} 
              className="border-2 shadow-xl hover-lift rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="space-y-4 pb-4 bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow-sm font-display font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="space-y-3 flex-1">
                    <CardTitle className="text-xl md:text-2xl font-display font-bold leading-tight text-foreground">
                      {question.english}
                    </CardTitle>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                      {question.hindi}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-8 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    onClick={() => onAnswer(index, 'yes')}
                    variant={selectedAnswer === 'yes' ? 'default' : 'outline'}
                    className={`h-16 text-lg font-bold group transition-all duration-300 rounded-2xl border-2 ${
                      selectedAnswer === 'yes' 
                        ? 'bg-success hover:bg-success/90 text-success-foreground border-success shadow-glow-md scale-105' 
                        : 'hover:scale-105 hover:border-success/50 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <CheckCircle2 className={`w-6 h-6 mr-2 group-hover:scale-125 transition-transform duration-300 ${
                      selectedAnswer === 'yes' ? 'text-success-foreground' : ''
                    }`} />
                    Yes / हाँ
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => onAnswer(index, 'no')}
                    variant={selectedAnswer === 'no' ? 'default' : 'outline'}
                    className={`h-16 text-lg font-bold group transition-all duration-300 rounded-2xl border-2 ${
                      selectedAnswer === 'no' 
                        ? 'bg-warning hover:bg-warning/90 text-warning-foreground border-warning shadow-glow-md scale-105' 
                        : 'hover:scale-105 hover:border-warning/50 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <XCircle className={`w-6 h-6 mr-2 group-hover:scale-125 transition-transform duration-300 ${
                      selectedAnswer === 'no' ? 'text-warning-foreground' : ''
                    }`} />
                    No / नहीं
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
