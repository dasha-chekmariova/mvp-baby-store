import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate("/results", { state: { query } });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center">
        <h1 className="text-4xl font-light mb-6">
          Що б ви хотіли придбати сьогодні?
        </h1>

        <form onSubmit={handleSubmit}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Наприклад: коврик 120х120 нейтральних відтінків"
            className="w-full p-4 border rounded-xl mb-4 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition"
          >
            Знайти товар
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;