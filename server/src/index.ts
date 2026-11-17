import express from 'express';
import { itemsRouter } from './routes/items';

const app = express();
app.use(express.json()); // parses JSON request bodies into req.body

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/items', itemsRouter);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));