import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import SearchBox from "../components/SearchBox";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchDone, setSearchDone] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    setError(null);
    setSearchDone(false);
    setSuggestions([]);

    fetch("http://localhost:5001/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Помилка сервера");
        return res.json();
      })
      .then((data) => {
        const results = data.results || [];
        setProducts(results);
        setSearchDone(true);

        if (results.length === 0) {
          fetch("http://localhost:5001/api/recommendations/fallback")
            .then((res) => res.json())
            .then((data) => setSuggestions(data.suggestions || []))
            .catch(console.error);
        }
      })
      .catch((err) => {
        console.error("Помилка завантаження:", err);
        setError(
          "Не вдалося завантажити товари. Перевірте з'єднання з сервером."
        );
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  const handleNewSearch = (newQuery: string) => {
    navigate("/results", { state: { query: newQuery }, replace: true });
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-xl text-gray-400 mb-4">Введіть запит для пошуку</p>
          <button
            onClick={() => navigate("/")}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-600 transition"
          >
            На головну
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search bar */}
      <div className="bg-white border-b border-gray-100 sticky top-[65px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <SearchBox
            onSearch={handleNewSearch}
            isLoading={isLoading}
            compact
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Результати для:{" "}
              <span className="text-pink-500">"{query}"</span>
            </h2>
            {!isLoading && searchDone && (
              <p className="text-gray-400 text-sm mt-1">
                Знайдено {products.length} товарів
              </p>
            )}
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-pink-500 font-medium hover:text-pink-600 transition shrink-0 text-sm"
          >
            ← На головну
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-pink-100 rounded-full" />
              <div className="w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin absolute top-0" />
            </div>
            <p className="text-gray-500 text-lg mt-6 font-medium">
              ШІ аналізує ваш запит...
            </p>
            <p className="text-gray-300 text-sm mt-1">
              Підбираємо найкращі товари
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-md mx-auto">
            <p className="text-4xl mb-3">😔</p>
            <p className="font-semibold text-red-600 mb-2">
              Помилка завантаження
            </p>
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition"
            >
              Спробувати знову
            </button>
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}

        {/* No results + suggestions */}
        {!isLoading && !error && searchDone && products.length === 0 && (
          <div>
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-xl text-gray-500 font-medium mb-2">
                Нічого не знайдено
              </p>
              <p className="text-gray-400 text-sm">
                Спробуйте змінити запит або переглянути наші рекомендації нижче
              </p>
            </div>

            {suggestions.length > 0 && (
              <section className="mt-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-grow bg-gray-200" />
                  <h3 className="text-lg font-bold text-gray-600 whitespace-nowrap">
                    Можливо, вам сподобається
                  </h3>
                  <div className="h-px flex-grow bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {suggestions.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
