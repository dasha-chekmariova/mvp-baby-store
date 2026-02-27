const categories = [
  "Килимки",
  "Візочки",
  "Одяг",
  "Іграшки",
  "Стільчики для годування",
  "Ліжечка",
];

const adjectives = [
  "Преміум",
  "Еко",
  "М'який",
  "Компактний",
  "Складаний",
  "Ортопедичний",
];

const products = [];

for (let i = 1; i <= 100; i++) {
  const category =
    categories[Math.floor(Math.random() * categories.length)];
  const adjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];

  products.push({
    id: i,
    name: `${adjective} ${category} №${i}`,
    category,
    price: Math.floor(Math.random() * 5000) + 500,
    rating: (Math.random() * 2 + 3).toFixed(1),
    image: `https://picsum.photos/seed/baby${i}/400/400`,
    description:
      "Безпечний та якісний товар для дітей, виготовлений з екологічних матеріалів.",
    specifications: {
      material: "Еко-пластик / Бавовна",
      age: "0-5 років",
      warranty: "12 місяців",
    },
    reviews: [
      {
        user: "Анна",
        comment: "Дуже задоволена покупкою!",
        stars: 5,
      },
      {
        user: "Ірина",
        comment: "Хороша якість за свою ціну",
        stars: 4,
      },
    ],
  });
}

export { products };