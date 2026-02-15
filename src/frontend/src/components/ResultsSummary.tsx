import { questions } from '../content/questions.axisMaxLife';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, ListChecks } from 'lucide-react';

interface ResultsSummaryProps {
  answers: Array<'yes' | 'no'>;
}

export default function ResultsSummary({ answers }: ResultsSummaryProps) {
  return (
    <Card className="border-2 border-primary/20 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-card to-card/50">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow-sm">
            <ListChecks className="w-7 h-7" />
          </div>
          <div>
            <CardTitle className="text-3xl font-display font-bold">Your Responses Summary</CardTitle>
            <p className="text-lg text-muted-foreground font-medium">आपके उत्तरों का सारांश</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 rounded-2xl border-2 border-border/50 hover:border-primary/30 transition-all duration-300 bg-card/50 hover:shadow-lg hover-lift"
            >
              <div className="shrink-0 pt-1">
                {answers[index] === 'yes' ? (
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center border-2 border-success/30">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center border-2 border-warning/30">
                    <XCircle className="w-6 h-6 text-warning" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-foreground leading-relaxed text-lg">{question.english}</p>
                <p className="text-base text-muted-foreground font-medium">{question.hindi}</p>
              </div>
              <div className="shrink-0 pt-1">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-xl text-base font-bold border-2 ${
                    answers[index] === 'yes'
                      ? 'bg-success/10 text-success border-success/30'
                      : 'bg-warning/10 text-warning border-warning/30'
                  }`}
                >
                  {answers[index] === 'yes' ? 'Yes / हाँ' : 'No / नहीं'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
