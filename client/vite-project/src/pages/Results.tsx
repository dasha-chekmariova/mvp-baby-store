import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Results = () => {
  const location = useLocation();
  const query = location.state?.query;
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    // Робимо запит до сервера
    fetch("http://localhost:5000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Отримані дані:", data);
        setProducts(data.results || []);
      })
      .catch((err) => console.error("Помилка завантаження:", err));
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Результати для: <span className="text-pink-500">"{query}"</span>
          <span className="ml-4 text-sm font-normal text-gray-400">
            ({products.length} товарів)
          </span>
        </h2>

        {/* СІТКА ТОВАРІВ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="font-bold text-gray-800 mb-2 leading-tight">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xl font-black text-pink-600">{product.price} грн</span>
                  <button className="bg-pink-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors">
                    Купити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ЯКЩО НІЧОГО НЕ ЗНАЙДЕНО */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl italic">Нічого не знайдено 🧸 Спробуйте інший запит.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;