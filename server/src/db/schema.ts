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

export const outfits = sqliteTable("outfits", {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name'),
    created_at: integer('created_at', {mode: 'timestamp'}).notNull().default(sql`(unixepoch())`),
    source: text("source", {enum: ["manuel", "generated"]}).notNull()
})

export const outfit_item = sqliteTable("outfit_item", {
    outfit_id: integer("outfit_id").primaryKey({autoIncrement: true}),
    item_id: integer("item_id").primaryKey({autoIncrement: true})
})

export const wear_events = sqliteTable("wear_events", {
    id: integer('id').primaryKey({autoIncrement: true}),
    outfit_id: integer("outfit_id").primaryKey({autoIncrement: true}),
    worn_at: integer('worn_at', {mode: 'timestamp'}).notNull().default(sql`(unixepoch())`)
})

export const feedback = sqliteTable("feedback", {
    id: integer('id').primaryKey({autoIncrement: true}),
    outfit_id: integer("outfit_id").primaryKey({autoIncrement: true}),
    item_id: integer("item_id").primaryKey({autoIncrement: true}), //what does nullable mean?
    //verdict: //what is verdict?
    created_at: integer('created_at', {mode: 'timestamp'}).notNull().default(sql`(unixepoch())`)
})

