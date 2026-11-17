import { Router } from 'express';
import { db } from '../db/index';
import { items } from '../db/schema';

export const itemsRouter = Router();

const REQUIRED = ['type', 'color', 'formality', 'style'];



itemsRouter.post('/', async (req, res) => {
  const missing = REQUIRED.filter((field) => !req.body[field]);

  if (missing.length > 0) {
    res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
    return;
  }

  const { name, type, color, formality, style, tempRange, precipitation } = req.body;

  const [created] = await db
    .insert(items)
    .values({ name, type, color, formality, style, tempRange, precipitation })
    .returning();

  res.status(201).json(created);
});

