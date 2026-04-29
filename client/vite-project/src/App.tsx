import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Cart from "./pages/Cart";
import { CartProvider, useCart } from "./context/CartContext";

const Header = () => {
  const { totalItems } = useCart();
  return (
    <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-black text-gray-800 tracking-tight hover:opacity-80 transition"
        >
          Baby<span className="text-pink-500">Store</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-pink-500 transition hidden sm:block"
          >
            Головна
          </Link>
          <Link
            to="/cart"
            className="relative bg-gray-50 hover:bg-pink-50 text-gray-700 hover:text-pink-600 px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-colors text-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Кошик
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="bg-gray-50 min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
