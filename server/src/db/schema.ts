import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  type: text("type").notNull(),
  color: text("color").notNull(),
  formality: text("formality").notNull(),
  style: text("style").notNull(),
  tempRange: text("temp_range"),
  precipitation: text("precipitation"),
  imagePath: text("image_path"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
