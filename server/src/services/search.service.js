import { extractFiltersFromQuery } from "./ai.service.js";
import { getRecommendations } from "./recommendation.service.js";

export const handleSearch = async (query) => {
  const filters = await extractFiltersFromQuery(query);
  const results = await getRecommendations(filters);

  return { filters, results };
};
