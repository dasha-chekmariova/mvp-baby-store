import { handleSearch } from "../services/search.service.js";

export async function searchProducts(req, res) {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const { filters, results } = await handleSearch(query);

    return res.json({ filters, results });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
