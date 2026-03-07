import { createContext, useContext, useState, type ReactNode } from "react";

// Створюємо контекст
export const CartContext = createContext<any>(null);

// Провайдер, який обгорне наш додаток
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
    // Маленьке сповіщення, щоб користувач бачив, що кнопка спрацювала
    alert(`Товар "${product.name}" додано до кошика! 🛍️`);
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Зручний хук для використання кошика
export const useCart = () => useContext(CartContext);