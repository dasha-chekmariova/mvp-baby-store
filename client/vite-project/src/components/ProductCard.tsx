import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const categoryLabels: Record<string, string> = {
  strollers: "Коляски",
  toys: "Іграшки",
  clothing: "Одяг",
  feeding: "Годування",
  hygiene: "Гігієна",
  cribs: "Ліжечка",
  books: "Книги",
  playmats: "Килимки",
};

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${
            i < full
              ? "text-amber-400"
              : i === full && half
                ? "text-amber-300"
                : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating}</span>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="h-52 bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="bg-white/90 backdrop-blur-sm text-pink-600 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
            {categoryLabels[product.category] || product.category}
          </span>
          {product.isOnSale && discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
              NEW
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-bold text-gray-800 mb-1.5 leading-tight line-clamp-2 text-sm">
          {product.name}
        </h3>

        {product.rating && <StarRating rating={product.rating} />}

        {product.color && (
          <p className="text-xs text-gray-400 mt-2">
            Колір: <span className="font-medium text-gray-500">{product.color}</span>
          </p>
        )}

        <p className="text-gray-400 text-xs mt-2 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-end mt-auto">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.oldPrice.toLocaleString("uk-UA")} грн
              </span>
            )}
            <span
              className={`text-xl font-black ${
                product.isOnSale ? "text-red-500" : "text-pink-600"
              }`}
            >
              {product.price.toLocaleString("uk-UA")} грн
            </span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:from-pink-600 hover:to-rose-600 transition-all active:scale-95 shadow-md shadow-pink-200/50"
          >
            В кошик
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
