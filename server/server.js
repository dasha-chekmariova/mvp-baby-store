import dotenv from 'dotenv';
dotenv.config(); // Має бути на самому початку

import app from "./src/app.js";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});