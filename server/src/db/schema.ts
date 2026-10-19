import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const closetItems = sqliteTable("closet_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  color: text("color"),
  imagePath: text("image_path"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type ClosetItem = typeof closetItems.$inferSelect;
export type NewClosetItem = typeof closetItems.$inferInsert;
