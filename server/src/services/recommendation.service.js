import { findProducts } from "../repositories/product.repository.js";
import { calculateScore } from "../utils/scoring.js";

export const getRecommendations = async (filters) => {
  const products = await findProducts(filters);

  const scored = products.map((product) => ({
    ...product,
    score: calculateScore(product, filters),
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, 20);
};
