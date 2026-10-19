import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, sqlite } from "./index.js";
import { items, type NewItem } from "./schema.js";

const seedItem = {
  name: "Blue denim jacket",
  type: "top",
  color: "blue",
  formality: "casual",
  style: "classic",
  tempRange: "mild",
  precipitation: "no precipitation",
  imagePath: null,
} satisfies NewItem;

try {
  const existing = db.select().from(items).where(eq(items.name, seedItem.name)).get();
  const item = existing ?? db.insert(items).values(seedItem).returning().get();
  const readBack = db.select().from(items).where(eq(items.id, item.id)).get();

  if (!readBack) throw new Error("Seeded item could not be read back");
  console.info("Seeded item:", readBack);
} finally {
  sqlite.close();
}
