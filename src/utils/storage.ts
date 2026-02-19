import type { QuizState } from "../types/quiz.types";

const KEY = 'quiz_app_state';
const USER_KEY = 'quiz_app_name';

export const storage = {
  getQuizState: (): QuizState | null => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) as QuizState : null;
  },
  saveQuizState: (state: QuizState) => {
    localStorage.setItem(KEY, JSON.stringify(state));
  },
  clearQuizState: () => {
    localStorage.removeItem(KEY);
  },
  getUserName: (): string | null => {
    return localStorage.getItem(USER_KEY);
  },
  saveUserName: (name: string) => {
    localStorage.setItem(USER_KEY, name);
  },
};