import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Компонент з літаючими іконками
const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="babyPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
            {/* Ведмедик */}
            <g transform="translate(20, 20) scale(1.2)" stroke="currentColor" fill="none" strokeWidth="1.5">
               <circle cx="12" cy="12" r="8"/>
               <circle cx="6" cy="6" r="3"/>
               <circle cx="18" cy="6" r="3"/>
               <circle cx="9" cy="11" r="1" fill="currentColor"/>
               <circle cx="15" cy="11" r="1" fill="currentColor"/>
               <path d="M10 15q2 2 4 0"/>
            </g>
            {/* Пустушка */}
            <g transform="translate(100, 40) scale(1.2)" stroke="currentColor" fill="none" strokeWidth="1.5">
                <circle cx="12" cy="16" r="4" />
                <path d="M8 12h8v2a4 4 0 0 1-8 0z" fill="currentColor" opacity="0.5"/>
                <path d="M12 4v8" />
            </g>
            {/* Коляска */}
            <g transform="translate(40, 90) scale(1.2)" stroke="currentColor" fill="none" strokeWidth="1.5">
                <path d="M16 16h-8v-6a4 4 0 0 1 8 0z" fill="currentColor" opacity="0.3"/>
                <circle cx="9" cy="18" r="2"/>
                <circle cx="15" cy="18" r="2"/>
                <path d="M16 10h4v-2"/>
                <path d="M8 10h8"/>
            </g>
            {/* Пляшечка */}
            <g transform="translate(110, 100) scale(1.2)" stroke="currentColor" fill="none" strokeWidth="1.5">
                <rect x="8" y="10" width="8" height="10" rx="2" />
                <path d="M10 10V6c0-1.1.9-2 2-2s2 .9 2 2v4" fill="currentColor" opacity="0.3"/>
                <path d="M9 10h6"/>
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#babyPattern)" className="text-pink-400"/>
      </svg>
    </div>
  );
};

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate("/results", { state: { query } });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center relative overflow-hidden">
      
      {/* Літаючі іконки на фоні */}
      <BackgroundPattern />

      {/* Анімація для фону */}
      <style>
        {`
          @keyframes floatItems {
            0% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(3deg); }
            66% { transform: translateY(10px) rotate(-2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .text-pink-400 rect {
            animation: floatItems 12s ease-in-out infinite;
          }
        `}
      </style>

      {/* Головна картка (додано backdrop-blur для ефекту скла) */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center relative z-10 border border-white">
        <h1 className="text-4xl font-light mb-6 text-gray-800">
          Що б ви хотіли придбати сьогодні?
        </h1>

        <form onSubmit={handleSubmit}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Наприклад: коврик 120х120 нейтральних відтінків"
            className="w-full p-4 border border-pink-100 rounded-xl mb-4 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-4 rounded-xl hover:bg-pink-600 transition text-lg shadow-lg shadow-pink-200"
          >
            Знайти товар
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;