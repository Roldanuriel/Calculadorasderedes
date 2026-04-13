import cors from 'cors';
import express from 'express';
import calculatorsRoutes from './routes/calculatorsRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'calculadoras-backend' });
});

app.use('/api', calculatorsRoutes);

app.listen(PORT, () => {
  console.log(`Backend activo en http://localhost:${PORT}`);
});
