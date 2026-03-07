const categories = ['strollers', 'toys', 'clothing', 'feeding', 'hygiene', 'cribs', 'books', 'playmats'];
const brands = ['Anex', 'Chicco', 'Cybex', 'Fisher-Price', 'LEGO', 'Carter`s', 'Reima', 'Tiny Love', 'Абабагаламага', 'Skip Hop'];
const colors = ['червоний', 'синій', 'рожевий', 'сірий', 'бежевий', 'чорний', 'зелений', 'жовтий', 'білий'];

const getProductName = (category, brand, color) => {
if (category === 'strollers') return brand + ' Коляска прогулянкова';
if (category === 'toys') return brand + ' Інтерактивна іграшка';
if (category === 'books') return brand + ' Дитяча книга з малюнками';
if (category === 'playmats') return brand + ' Розвиваючий килимок';
if (category === 'clothing') return brand + ' Теплий комбінезон';
if (category === 'feeding') return brand + ' Стільчик для годування';
if (category === 'hygiene') return brand + ' Набір для догляду';
if (category === 'cribs') return brand + ' Дитяче ліжечко';
return brand + ' Універсальний товар';
};

const generateProducts = (count) => {
const items = [];
for (let i = 1; i <= count; i++) {
const category = categories[Math.floor(Math.random() * categories.length)];
const brand = brands[Math.floor(Math.random() * brands.length)];
const color = colors[Math.floor(Math.random() * colors.length)];

items.push({
  id: i,
  name: getProductName(category, brand, color) + " (" + color + ")",
  category: category,
  color: color,
  price: Math.floor(Math.random() * (15000 - 200) + 200),
  description: "Чудовий товар у категорії " + category + ". Бренд: " + brand + ". Колір: " + color + ".",
  image: "https://placehold.co/400x400/fce7f3/db2777?text=Baby+Store" + (i + 1000) + "/400/400"
});
}
return items;
};

const products = generateProducts(400);
export default products;