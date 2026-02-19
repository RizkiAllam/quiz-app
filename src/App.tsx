import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      {/* Router Layer:*/}
      <Routes>
        {/* Halaman Login (Entry Point) */}
        <Route path="/" element={<LoginPage />} />

        {/* Halaman Utama Kuis */}
        <Route path="/quiz" element={<QuizPage />} />

        {/* Halaman Hasil */}
        <Route path="/result" element={<ResultPage />} />

        {/* Fallback: Jika user akses URL aneh, kembalikan ke Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
