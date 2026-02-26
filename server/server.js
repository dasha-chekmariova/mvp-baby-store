import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/search", (req, res) => {
  const { query } = req.body;

  console.log("Search request:", query);

  // Поки що fake response
  const products = [
    {
      id: 1,
      name: "Килимок 120x120 нейтральний",
      price: "1499 грн",
    },
    {
      id: 2,
      name: "Дитячий килимок пастельний",
      price: "1299 грн",
    },
  ];

  res.json(products);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
  });