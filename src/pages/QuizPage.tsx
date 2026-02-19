import he from 'he'; // Library untuk decode HTML entities
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { QuizHeader } from '../components/quiz/QuizHeader';

export default function QuizPage() {
  // 1. call custom hook untuk logika kuis
  const { state, loading, handleAnswer } = useQuizLogic();

  // 2. Handle Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600">
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white mb-4"></div>
          <span className="text-white font-bold animate-pulse">Memuat Soal...</span>
        </div>
      </div>
    );
  }

  // 3. Render Soal Kuis
  const currentQ = state.questions[state.currentQuestionIndex];

  // 4. Safety Check
  if (!currentQ) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      <Card>
        {/* Header: Progress & Timer */}
        <QuizHeader 
          currentIndex={state.currentQuestionIndex} 
          total={state.questions.length} 
          timeLeft={state.timeLeft} 
        />

        <div className="mb-8 text-center">
          {/* Category Tag */}
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-200">
            {currentQ.category}
          </span>
          
          {/* Question Text */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
            {he.decode(currentQ.question)}
          </h2>
        </div>

        {/* Answers Grid */}
        <div className="grid grid-cols-1 gap-4">
          {currentQ.all_answers?.map((ans: string, idx: number) => (
            <Button 
              key={idx} 
              variant="outline" 
              onClick={() => handleAnswer(ans)}
              className="text-left justify-start px-6 hover:pl-8 transition-all group"
            >
              {/* Label A, B, C, D */}
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {String.fromCharCode(65 + idx)}
              </span>
               {/* Teks Jawaban */}
              <span className="flex-1">{he.decode(ans)}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}