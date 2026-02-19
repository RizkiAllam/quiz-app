import axios from 'axios'
import type { Question } from '../types/quiz.types'

export const fetchQuizQuestions = async (amount: number = 10): Promise<Question[]> => {
  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
  
  return response.data.results.map((q: Question) => ({
    ...q,
    // Shuffle jawaban di level service agar component terima data matang
    all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
  }));
};