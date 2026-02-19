import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { storage } from "../utils/storage";
import type { QuizState } from "../types/quiz.types";

const StatItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className={`flex justify-between items-center p-3 rounded-lg ${color}`}>
    <span className="font-medium">{label}</span>
    <span className="font-bold text-lg">{value}</span>
  </div>
);

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const quizData = state as QuizState;
  const user = storage.getUserName() || "User";

  if (!quizData)
    return <div className="text-center p-10">Data tidak valid.</div>;

  const total = quizData.questions.length;
  const correct = quizData.score;
  const wrong = quizData.answersCount - correct;
  const skipped = total - quizData.answersCount;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🏆</div>
          <h2 className="text-2xl font-bold text-gray-800">Kuis Selesai!</h2>
          <p className="text-gray-500">Kerja bagus, {user}</p>
        </div>

        <div className="space-y-3 mb-8">
          <StatItem
            label="Benar"
            value={correct}
            color="bg-green-50 text-green-700"
          />
          <StatItem
            label="Salah"
            value={wrong}
            color="bg-red-50 text-red-700"
          />
          <StatItem
            label="Tidak Dijawab"
            value={skipped}
            color="bg-yellow-50 text-yellow-700"
          />
          <div className="pt-2 border-t flex justify-between font-bold text-gray-800">
            <span>Total Soal</span>
            <span>{total}</span>
          </div>
        </div>

        <Button onClick={() => navigate("/")}>Main Lagi</Button>
      </Card>
    </div>
  );
}
