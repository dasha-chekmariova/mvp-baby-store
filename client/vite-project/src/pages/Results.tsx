import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Results = () => {
  const location = useLocation();
  const query = location.state?.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h2 className="text-3xl mb-6">
        Результати для: <span className="text-pink-500">{query}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h3 className="text-xl mb-2">{product.name}</h3>
            <p className="text-pink-500 font-bold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;