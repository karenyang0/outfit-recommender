import { Router } from 'express';
import { db } from '../db/index';
import { items } from '../db/schema';
import { eq } from 'drizzle-orm';


export const itemsRouter = Router();

const REQUIRED = ['type', 'color', 'formality', 'style'];

const ENUMS = {
  type: items.type.enumValues,
  formality: items.formality.enumValues,
  tempRange: items.tempRange.enumValues,
  precipitation: items.precipitation.enumValues,
} as Record<string, readonly string[]>;

//POST
itemsRouter.post('/', async (req, res) => {
  const missing = REQUIRED.filter((field) => !req.body[field]);

  if (missing.length > 0) {
    res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
    return;
  }

  const invalid = Object.keys(ENUMS).filter(
    (field) => req.body[field] != null && !ENUMS[field].includes(req.body[field])
  );

  if (invalid.length > 0) {
    res.status(400).json({ error: `Invalid values for: ${invalid.join(', ')}` });
    return;
  }

  const { name, type, color, formality, style, tempRange, precipitation } = req.body;

  const [created] = await db
    .insert(items)
    .values({ name, type, color, formality, style, tempRange, precipitation })
    .returning();

  res.status(201).json(created);
});


//GET ITEMS
itemsRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: 'Invalid item id' });
    return;
  }

  const [item] = await db
    .select()
    .from(items)
    .where(eq(items.id, id))
    .limit(1);

  if (!item) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  res.json(item);
});

itemsRouter.get('/', async (_req, res) => {
  const allItems = await db.select().from(items);
  res.json(allItems);
});



// PATCH /items/:id
itemsRouter.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: 'Invalid item id' });
    return;
  }

  const allowedFields = [
    'name',
    'type',
    'color',
    'formality',
    'style',
    'tempRange',
    'precipitation',
    'imagePath',
  ];

  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([field]) => allowedFields.includes(field))
  );

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: 'Provide at least one field to update' });
    return;
  }

  const enumFields = ['type', 'formality', 'tempRange', 'precipitation'] as const;

  const invalid = enumFields.filter((field) => {
    const value = updates[field];
    return value != null && !ENUMS[field].includes(value as string);
  });

  if (invalid.length > 0) {
    res.status(400).json({ error: `Invalid values for: ${invalid.join(', ')}` });
    return;
  }

  const [updated] = await db
    .update(items)
    .set(updates)
    .where(eq(items.id, id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  res.json(updated);
});



// DELETE /items/:id
itemsRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: 'Invalid item id' });
    return;
  }

  const [deleted] = await db
    .delete(items)
    .where(eq(items.id, id))
    .returning({ id: items.id });

  if (!deleted) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  res.status(204).send();
});