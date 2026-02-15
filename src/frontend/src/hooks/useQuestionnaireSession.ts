import { useState, useEffect } from 'react';
import { questions } from '../content/questions.axisMaxLife';

const STORAGE_KEY = 'axis-questionnaire-session';

interface SessionData {
  answers: Array<'yes' | 'no' | undefined>;
  yes60PopupShown?: boolean;
}

export function useQuestionnaireSession() {
  const [answers, setAnswers] = useState<Array<'yes' | 'no' | undefined>>(
    Array(questions.length).fill(undefined)
  );
  const [yes60PopupShown, setYes60PopupShown] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: SessionData = JSON.parse(stored);
        if (data.answers && Array.isArray(data.answers)) {
          setAnswers(data.answers);
        }
        if (data.yes60PopupShown !== undefined) {
          setYes60PopupShown(data.yes60PopupShown);
        }
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      const data: SessionData = {
        answers,
        yes60PopupShown,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }, [answers, yes60PopupShown]);

  const setAnswer = (index: number, answer: 'yes' | 'no') => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const markYes60PopupShown = () => {
    setYes60PopupShown(true);
  };

  const reset = () => {
    setAnswers(Array(questions.length).fill(undefined));
    setYes60PopupShown(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  };

  const isComplete = answers.every((answer) => answer !== undefined);

  return {
    answers,
    setAnswer,
    reset,
    isComplete,
    yes60PopupShown,
    markYes60PopupShown,
  };
}
