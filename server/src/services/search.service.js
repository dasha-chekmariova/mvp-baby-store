import { analyzeQuery } from "./ai.service.js";
import { getRecommendations } from "./recommendation.service.js";

export const handleSearch = async (query) => {
  const filters = await analyzeQuery(query);

  const recommendations = await getRecommendations(filters);

  return {
    filters,
    results: recommendations,
  };
};