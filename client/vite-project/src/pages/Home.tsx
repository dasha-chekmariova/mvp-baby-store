import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";

const categoryCards = [
  { key: "strollers", label: "Коляски", emoji: "🍼" },
  { key: "toys", label: "Іграшки", emoji: "🧸" },
  { key: "clothing", label: "Одяг", emoji: "👶" },
  { key: "cribs", label: "Ліжечка", emoji: "🛏️" },
  { key: "feeding", label: "Годування", emoji: "🥣" },
  { key: "books", label: "Книги", emoji: "📚" },
  { key: "hygiene", label: "Гігієна", emoji: "🧴" },
  { key: "playmats", label: "Килимки", emoji: "🎨" },
];

interface HomeData {
  popular: Product[];
  onSale: Product[];
  newArrivals: Product[];
}

const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/recommendations/home")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query: string) => {
    navigate("/results", { state: { query } });
  };

  const handleCategoryClick = (category: string) => {
    navigate("/results", { state: { query: category } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            ШІ-пошук товарів
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Знайдемо ідеальний товар
            <br />
            <span className="text-pink-200">для вашого малюка</span>
          </h1>

          <p className="text-pink-100 text-lg mb-8 max-w-lg mx-auto">
            Опишіть що шукаєте природною мовою — штучний інтелект підбере
            найкращі варіанти
          </p>

          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl shadow-pink-900/20 max-w-xl mx-auto">
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categoryCards.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.label)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center gap-2 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {cat.emoji}
              </span>
              <span className="text-xs font-medium text-gray-600 group-hover:text-pink-600 transition-colors">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
        </div>
      ) : (
        data && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
            {/* Sale Section */}
            {data.onSale.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-500 text-white px-4 py-1.5 rounded-xl text-sm font-bold animate-pulse">
                    SALE
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Акційні пропозиції
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Встигніть придбати за зниженою ціною
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {data.onSale.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* New Arrivals */}
            {data.newArrivals.length > 0 && (
              <section>
                <SectionTitle
                  title="Новинки"
                  subtitle="Щойно надійшли у наш магазин"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {data.newArrivals.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Popular */}
            {data.popular.length > 0 && (
              <section>
                <SectionTitle
                  title="Популярні товари"
                  subtitle="Найвищі оцінки від наших покупців"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {data.popular.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Promo Banner */}
            <section className="bg-gradient-to-r from-violet-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Безкоштовна доставка від 2000 грн
                </h3>
                <p className="text-white/80 text-lg mb-6 max-w-lg">
                  Замовляйте онлайн — доставимо Новою Поштою по всій Україні.
                  Повернення протягом 14 днів.
                </p>
                <button
                  onClick={() => handleSearch("популярні іграшки")}
                  className="bg-white text-pink-600 px-6 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors shadow-lg"
                >
                  Почати покупки
                </button>
              </div>
            </section>
          </div>
        )
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xl font-black text-white tracking-tight">
              Baby<span className="text-pink-500">Store</span>
            </span>
            <p className="text-sm">
              &copy; 2025 BabyStore. Дипломний проект. Усі права захищені.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
