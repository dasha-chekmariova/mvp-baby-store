import express from 'express';
import cors from 'cors';
import { extractFiltersFromQuery } from './services/ai.service.js';
import { findProducts } from './repositories/product.repository.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/search', async (req, res) => {
try {
const { query } = req.body;
if (!query) {
return res.status(400).json({ error: "Query is required" });
}

const filters = await extractFiltersFromQuery(query);
const results = await findProducts(filters);

res.json({ filters, results });
} catch (error) {
console.error("Route Error:", error);
res.status(500).json({ error: "Internal Server Error" });
}
});

export default app;