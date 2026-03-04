import products from '../data/products.js';

export const findProducts = async (filters) => {
const { category, maxPrice, color, searchQuery } = filters;

return products.filter(product => {
// 1. Фільтр категорії
let matchCategory = true;
if (category && category !== "all" && category !== "null") {
matchCategory = product.category === category;
}

// 2. Фільтр ціни
let matchPrice = true;
if (maxPrice) {
  matchPrice = product.price <= maxPrice;
}

// 3. Фільтр кольору (Точний збіг завдяки ШІ!)
let matchColor = true;
if (color && color !== "null") {
  matchColor = product.color === color;
}

// 4. Фільтр по залишкових словах (наприклад, бренд)
let matchText = true;
if (searchQuery && searchQuery !== "null" && searchQuery !== "") {
  const textToSearch = searchQuery.toLowerCase();
  matchText = product.name.toLowerCase().includes(textToSearch) || 
              product.description.toLowerCase().includes(textToSearch);
}

return matchCategory && matchPrice && matchColor && matchText;
});
};