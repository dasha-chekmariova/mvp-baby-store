import { parseUserQuery } from "../services/ai.service.js";
import { filterProducts } from "../services/product.service.js";

export async function searchController(req, res) {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // 1. AI parsing
    const filters = await parseUserQuery(query);

    // 2. Product filtering
    const results = filterProducts(filters);

    return res.json({
      filters,
      results,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}