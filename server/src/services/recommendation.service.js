import { findByFilters } from "../repositories/product.repository.js";
import { calculateScore } from "../utils/scoring.js";

export const getRecommendations = async (filters) => {
    const products = await findByFilters(filters);

  const scoredProducts = products.map((product) => {
    const score = calculateScore(product, filters);

    return {
      ...product,
      score,
    };
  });

  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
};