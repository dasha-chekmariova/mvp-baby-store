import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const paymentText = paymentMethod === "card" ? "Карткою онлайн" : "При отриманні";

    setOrderSuccess(true);
    clearCart();

    setTimeout(() => {
      alert(
        `Дякуємо за замовлення, ${firstName}!\n\nВаше замовлення на суму ${totalPrice.toLocaleString("uk-UA")} грн успішно оформлено.\nСпосіб оплати: ${paymentText}.\n\nОчікуйте повідомлення з ТТН найближчим часом.`
      );
      navigate("/");
    }, 100);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-5xl mb-4">🎉</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Замовлення оформлено!</h2>
          <p className="text-gray-400">Перенаправляємо на головну...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center py-10">
          <p className="text-5xl mb-4">🧸</p>
          <p className="text-2xl text-gray-400 mb-6 font-light">Ваш кошик поки порожній</p>
          <button
            onClick={() => navigate("/")}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-600 transition"
          >
            Перейти до покупок
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {showForm ? "Оформлення замовлення" : `Кошик (${totalItems})`}
        </h2>

        {!showForm ? (
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-50 pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-gray-100"
                  />
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-gray-800 leading-tight truncate">
                      {item.name}
                    </h3>
                    {item.color && (
                      <p className="text-gray-400 text-sm mt-0.5">
                        Колір: {item.color}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium text-gray-600 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 hover:bg-pink-50 hover:text-pink-500 transition text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="font-black text-lg text-pink-600 whitespace-nowrap">
                    {(item.price * item.quantity).toLocaleString("uk-UA")} грн
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-pink-50/50 p-6 rounded-2xl">
              <span className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                До сплати:{" "}
                <span className="text-pink-600">
                  {totalPrice.toLocaleString("uk-UA")} грн
                </span>
              </span>
              <button
                onClick={() => setShowForm(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg shadow-pink-200 w-full sm:w-auto"
              >
                Оформити замовлення
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ім'я
                </label>
                <input
                  name="firstName"
                  required
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Дарина"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Прізвище
                </label>
                <input
                  name="lastName"
                  required
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Шевченко"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Населений пункт
              </label>
              <input
                name="address"
                required
                type="text"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="м. Іллінці, Вінницька обл."
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Поштове відділення
              </label>
              <input
                name="postOffice"
                required
                type="text"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Нова Пошта №1"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Спосіб оплати
              </label>
              <select
                name="paymentMethod"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
              >
                <option value="card">Оплата карткою онлайн</option>
                <option value="cash">При отриманні (накладений платіж)</option>
              </select>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-2">Ваше замовлення:</p>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-medium">{(item.price * item.quantity).toLocaleString("uk-UA")} грн</span>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-gray-800">
                <span>Разом:</span>
                <span className="text-pink-600">{totalPrice.toLocaleString("uk-UA")} грн</span>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-4 gap-4">
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
                Підтвердити ({totalPrice.toLocaleString("uk-UA")} грн)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;
