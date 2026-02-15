import { useState, useEffect } from 'react';
import AxisMaxLifeHeader from './components/AxisMaxLifeHeader';
import QuestionnaireFlow from './components/QuestionnaireFlow';
import CompletionScreen from './components/CompletionScreen';
import ContactUsPage from './components/ContactUsPage';
import { useQuestionnaireSession } from './hooks/useQuestionnaireSession';
import { SiCaffeine } from 'react-icons/si';
import { Heart, Sparkles } from 'lucide-react';

type View = 'questionnaire' | 'completion' | 'contact';

function App() {
  const {
    answers,
    setAnswer,
    reset,
    isComplete,
    yes60PopupShown,
    markYes60PopupShown,
  } = useQuestionnaireSession();
  const [showCompletion, setShowCompletion] = useState(false);
  const [currentView, setCurrentView] = useState<View>('questionnaire');

  useEffect(() => {
    if (isComplete && currentView === 'questionnaire') {
      setShowCompletion(true);
      setCurrentView('completion');
    }
  }, [isComplete, currentView]);

  const handleStartOver = () => {
    reset();
    setShowCompletion(false);
    setCurrentView('questionnaire');
  };

  const handleNavigateToContact = () => {
    setCurrentView('contact');
  };

  const handleNavigateToQuestionnaire = () => {
    if (showCompletion) {
      setCurrentView('completion');
    } else {
      setCurrentView('questionnaire');
    }
  };

  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'axis-max-life'
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background pattern */}
      <div className="fixed inset-0 geo-pattern-bg pointer-events-none" />
      
      <AxisMaxLifeHeader 
        onNavigateToContact={handleNavigateToContact}
        onNavigateToQuestionnaire={handleNavigateToQuestionnaire}
        currentView={currentView}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 relative z-10">
        {currentView === 'contact' ? (
          <ContactUsPage />
        ) : currentView === 'completion' ? (
          <CompletionScreen 
            answers={answers} 
            onRestart={handleStartOver}
            onNavigateToContact={handleNavigateToContact}
          />
        ) : (
          <QuestionnaireFlow
            answers={answers}
            onAnswer={setAnswer}
            onStartOver={handleStartOver}
            yes60PopupShown={yes60PopupShown}
            onMarkYes60PopupShown={markYes60PopupShown}
          />
        )}
      </main>

      <footer className="relative z-10 py-8 border-t-2 border-primary/20 bg-gradient-to-r from-card via-primary/5 to-card backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              <p className="flex items-center gap-2">
                Built with{' '}
                <Heart className="w-4 h-4 text-primary fill-primary inline-block animate-pulse" />{' '}
                using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-foreground hover:text-primary transition-colors hover:scale-105 transform duration-200"
                >
                  <SiCaffeine className="w-4 h-4" />
                  caffeine.ai
                </a>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Axis Max Life. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
