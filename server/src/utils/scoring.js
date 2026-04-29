export const calculateScore = (product, filters) => {
  let score = 0;

  if (filters.category && product.category === filters.category) {
    score += 40;
  }

  if (filters.color && product.color === filters.color) {
    score += 20;
  }

  if (filters.searchQuery && filters.searchQuery !== "null") {
    const query = filters.searchQuery.toLowerCase();
    const name = product.name.toLowerCase();
    const desc = product.description.toLowerCase();

    if (name.includes(query)) score += 15;
    if (desc.includes(query)) score += 10;
  }

  if (filters.maxPrice) {
    const ratio = 1 - product.price / filters.maxPrice;
    score += Math.max(0, ratio * 10);
  }

  return Math.round(score * 100) / 100;
};
