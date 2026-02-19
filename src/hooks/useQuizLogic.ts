import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/quizService';
import { storage } from '../utils/storage';
import type { QuizState } from '../types/quiz.types';

const INITIAL_TIME = 60;

export const useQuizLogic = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timeLeft: INITIAL_TIME,
    isFinished: false,
    answersCount: 0
  });

  // Init Data
  useEffect(() => {
    const loadGame = async () => {
      const saved = storage.getQuizState();
      if (saved && !saved.isFinished) {
        setState(saved);
        setLoading(false);
      } else {
        try {
          const questions = await fetchQuizQuestions(10);
          const newState = {
            questions,
            currentQuestionIndex: 0,
            score: 0,
            timeLeft: INITIAL_TIME,
            isFinished: false,
            answersCount: 0
          };
          setState(newState);
          storage.saveQuizState(newState);
          setLoading(false);
        } catch (error) {
          console.error("Error init quiz", error);
        }
      }
    };
    loadGame();
  }, []);

  // Timer Logic
  useEffect(() => {
    if (loading || state.isFinished) return;
    
    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          finishGame({ ...prev, timeLeft: 0, isFinished: true });
          return { ...prev, timeLeft: 0, isFinished: true };
        }
        const updated = { ...prev, timeLeft: prev.timeLeft - 1 };
        storage.saveQuizState(updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, state.isFinished]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const finishGame = (finalState: QuizState) => {
    storage.clearQuizState();
    navigate('/result', { state: finalState });
  };

  const handleAnswer = useCallback((answer: string) => {
    setState(prev => {
      const isCorrect = answer === prev.questions[prev.currentQuestionIndex].correct_answer;
      const nextIdx = prev.currentQuestionIndex + 1;
      const isDone = nextIdx >= prev.questions.length;

      const nextState = {
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        answersCount: prev.answersCount + 1,
        currentQuestionIndex: isDone ? prev.currentQuestionIndex : nextIdx,
        isFinished: isDone
      };

      if (isDone) {
        finishGame(nextState);
      } else {
        storage.saveQuizState(nextState);
      }
      return nextState;
    });
  }, [finishGame]);

  return { state, loading, handleAnswer };
};