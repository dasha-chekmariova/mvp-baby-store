import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Cart from "./pages/Cart";
import { CartProvider, useCart } from "./context/CartContext";

// Створюємо компонент шапки (Header)
const Header = () => {
  const { cart } = useCart();
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-gray-800 tracking-tight">
          Baby<span className="text-pink-500">Store</span>
        </Link>
        <Link to="/cart" className="bg-pink-50 text-pink-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-100 transition">
          🛒 Кошик
          {cart.length > 0 && (
            <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

function App() {
  return (
    // Огортаємо весь додаток у CartProvider, щоб кошик був доступний всюди
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