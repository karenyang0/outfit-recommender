import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const items = sqliteTable("items", {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name'),
    type: text('type', {enum: ["top", "bottom", "shoes", "jewelry", "accessories"] }).notNull(),
    color: text('color').notNull(),
    formality: text('formality', {enum: ["casual", "business casual","professional"]}).notNull(),
    style: text('style').notNull(),
    temp_range: text('temp_range', {enum: ["cold", "mild", "hot"]}),
    precipitation: text('precipitation', {enum: ["snow", "rain", "none"]}),
    image_path: text('image_path'),
    created_at: integer('created_at', {mode: 'timestamp'}).notNull().default(sql`(unixepoch())`)
})

