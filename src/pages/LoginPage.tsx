import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../utils/storage";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";

export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    storage.saveUserName(name);

    // Cek apakah ada sesi kuis yang tersimpan (Resume Feature)
    if (storage.getQuizState()) {
      const confirmResume = window.confirm(
        "Sesi kuis terakhir ditemukan. Lanjutkan?",
      );
      if (!confirmResume) storage.clearQuizState();
    }

    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-2">
            Quiz App
          </h1>
          <p className="text-gray-500 font-medium">
            Test pengetahuan codingmu!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
              placeholder="Masukkan nama Anda..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="shadow-xl shadow-indigo-500/30">
            Mulai Kuis 🚀
          </Button>
        </form>
      </Card>
    </div>
  );
}
