import { products } from "./data/products.js";

app.post("/api/search", (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.json(products.slice(0, 20));
  }

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filtered);
});