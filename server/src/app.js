import express from 'express';
import cors from 'cors';
import searchRoutes from './routes/search.routes.js';
import recommendationsRoutes from './routes/recommendations.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/search', searchRoutes);
app.use('/api/recommendations', recommendationsRoutes);

export default app;
