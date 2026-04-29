import { useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  compact?: boolean;
}

const SearchBox = ({ onSearch, isLoading, compact }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSearch(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!query.trim() || isLoading) return;
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={compact ? "w-full" : ""}>
      <div className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Наприклад: коляска Cybex до 5000 грн чорного кольору..."
          className={`w-full border border-pink-100 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-gray-700 placeholder:text-gray-300 ${
            compact ? "p-3 h-16 text-sm" : "p-5 h-28 text-base"
          }`}
          disabled={isLoading}
        />
        <p className="text-xs text-gray-300 mt-1 ml-1">
          Enter — пошук, Shift+Enter — новий рядок
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className={`w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg shadow-pink-200/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${
          compact ? "py-3 mt-2 text-sm" : "py-4 mt-3 text-lg"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ШІ шукає...
          </span>
        ) : (
          "Знайти товар"
        )}
      </button>
    </form>
  );
};

export default SearchBox;
