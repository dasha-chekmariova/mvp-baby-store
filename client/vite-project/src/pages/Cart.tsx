import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Цей стан контролює, що показувати: товари чи форму замовлення
  const [showForm, setShowForm] = useState(false); 

  // Рахуємо загальну суму
  const total = cart.reduce((sum: number, item: any) => sum + item.price, 0);

  // Функція, яка спрацьовує при натисканні "Підтвердити замовлення"
  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Збираємо дані з форми
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const paymentMethod = formData.get("paymentMethod");
    
    const paymentText = paymentMethod === "card" ? "Карткою онлайн" : "При отриманні";

    // Показуємо красиве повідомлення про успіх
    alert(`🎉 Дякуємо за замовлення, ${firstName}!\n\nВаше замовлення на суму ${total} грн успішно оформлено.\nСпосіб оплати: ${paymentText}.\n\nОчікуйте повідомлення з ТТН найближчим часом.`);
    
    // Очищаємо кошик і повертаємо на головну
    clearCart();
    navigate("/");
  };

  // Якщо кошик порожній
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center py-10">
          <p className="text-2xl text-gray-400 mb-6 font-light">Твій кошик поки порожній 🧸</p>
          <button onClick={() => navigate("/")} className="text-pink-500 font-bold underline hover:text-pink-600 transition">
            Повернутися до покупок
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Заголовок змінюється залежно від етапу */}
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {showForm ? "Оформлення замовлення 📦" : "Ваш кошик 🛒"}
        </h2>

        {!showForm ? (
          /* ================= ЕТАП 1: СПИСОК ТОВАРІВ ================= */
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4 border-b border-gray-50 pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-gray-100" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-800 leading-tight">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">Колір: <span className="font-medium">{item.color}</span></p>
                  </div>
                  <span className="font-black text-xl text-pink-600 whitespace-nowrap">{item.price} грн</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-pink-50/50 p-6 rounded-2xl">
              <span className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                До сплати: <span className="text-pink-600">{total} грн</span>
              </span>
              <button
                onClick={() => setShowForm(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg shadow-pink-200 w-full sm:w-auto"
              >
                Перейти до оформлення
              </button>
            </div>
          </>
        ) : (
          /* ================= ЕТАП 2: ФОРМА ДАНИХ ================= */
          <form onSubmit={handleSubmitOrder} className="space-y-5 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Ім'я</label>
                <input name="firstName" required type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Дарина" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Прізвище</label>
                <input name="lastName" required type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Шевченко" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Населений пункт</label>
              <input name="address" required type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="м. Іллінці, Вінницька обл." />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Поштове відділення</label>
              <input name="postOffice" required type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Нова Пошта №1" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Спосіб оплати</label>
              <select name="paymentMethod" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white">
                <option value="card">💳 Оплата карткою онлайн</option>
                <option value="cash">📦 При отриманні (накладений платіж)</option>
              </select>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-100 gap-4">
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="text-gray-500 hover:text-gray-800 font-medium px-4 py-2 w-full sm:w-auto"
              >
                ← Назад до кошика
              </button>
              <button 
                type="submit" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg shadow-green-200 w-full sm:w-auto"
              >
                Підтвердити ({total} грн)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;