const categories = ['strollers', 'toys', 'clothing', 'feeding', 'hygiene', 'cribs', 'books', 'playmats'];
const brands = ['Anex', 'Chicco', 'Cybex', 'Fisher-Price', 'LEGO', "Carter's", 'Reima', 'Tiny Love', 'Абабагаламага', 'Skip Hop'];
const colors = ['червоний', 'синій', 'рожевий', 'сірий', 'бежевий', 'чорний', 'зелений', 'жовтий', 'білий'];

const categoryNames = {
  strollers: 'Коляска прогулянкова',
  toys: 'Інтерактивна іграшка',
  books: 'Дитяча книга з малюнками',
  playmats: 'Розвиваючий килимок',
  clothing: 'Теплий комбінезон',
  feeding: 'Стільчик для годування',
  hygiene: 'Набір для догляду',
  cribs: 'Дитяче ліжечко',
};

const categoryDescriptions = {
  strollers: 'Зручна та надійна коляска для щоденних прогулянок. Легке складання, амортизація, регульована спинка.',
  toys: 'Розвиваюча іграшка для дітей від 6 місяців. Стимулює моторику, уяву та координацію.',
  books: 'Яскрава книга з великими ілюстраціями та цікавими історіями для найменших читачів.',
  playmats: 'М\'який килимок з інтерактивними елементами для безпечних ігор та розвитку малюка.',
  clothing: 'Теплий та зручний комбінезон з натуральних матеріалів. Підходить для прогулянок у холодну погоду.',
  feeding: 'Ергономічний стільчик для годування з регульованою висотою та знімним підносом.',
  hygiene: 'Повний набір засобів для щоденного догляду за малюком. Гіпоалергенні компоненти.',
  cribs: 'Безпечне та стійке ліжечко з натурального дерева. Регульоване дно, знімний бортик.',
};

const generateProducts = (count) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    const category = categories[i % categories.length];
    const brand = brands[i % brands.length];
    const color = colors[i % colors.length];
    const price = Math.floor(200 + (i * 37) % 14800);
    const rating = +(3.5 + (i * 7 % 15) / 10).toFixed(1);
    const reviewsCount = (i * 13) % 200 + 5;

    const isOnSale = i % 7 === 0;
    const isNew = i % 11 === 0;
    const oldPrice = isOnSale ? Math.floor(price * (1.2 + (i % 5) * 0.1)) : null;

    items.push({
      id: i,
      name: `${brand} ${categoryNames[category]} (${color})`,
      category,
      color,
      price,
      oldPrice,
      isOnSale,
      isNew,
      rating: Math.min(rating, 5.0),
      reviewsCount,
      description: `${categoryDescriptions[category]} Бренд: ${brand}. Колір: ${color}.`,
      image: `https://placehold.co/400x400/fce7f3/db2777?text=${encodeURIComponent(brand)}`,
    });
  }
  return items;
};

const products = generateProducts(400);
export default products;
