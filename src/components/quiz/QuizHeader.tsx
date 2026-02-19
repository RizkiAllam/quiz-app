
interface Props {
  currentIndex: number;
  total: number;
  timeLeft: number;
}

export const QuizHeader = ({ currentIndex, total, timeLeft }: Props) => {
  const progress = ((currentIndex + 1) / total) * 100;
  const isUrgent = timeLeft <= 10;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Progress</span>
          <span className="text-indigo-600 font-extrabold text-lg">
            {currentIndex + 1} <span className="text-gray-400 text-sm font-medium">/ {total}</span>
          </span>
        </div>

        {/* Timer Badge */}
        <div className={`
          flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border
          ${isUrgent ? 'bg-red-50 border-red-200 animate-pulse' : 'bg-blue-50 border-blue-100'}
        `}>
          <span className="text-xl">⏱️</span>
          <span className={`font-mono font-bold text-xl ${isUrgent ? 'text-red-600' : 'text-blue-600'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Modern Progress Bar */}
      <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="absolute top-0 left-0 h-full bg-linear-to-r from-blue-400 to-indigo-600 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};