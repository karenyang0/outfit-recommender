import { sqliteTable, integer, text, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const items = sqliteTable("items", {
    id: integer("id").primaryKey({autoIncrement: true}),
    name: text("name"),
    type: text("type", {enum: ["top", "bottom", "shoes", "jewelry", "accessories"] }).notNull(),
    color: text("color").notNull(),
    formality: text("formality", {enum: ["casual", "business casual","professional"]}).notNull(),
    style: text("style").notNull(),
    tempRange: text("temp_range", {enum: ["cold", "mild", "hot"]}),
    precipitation: text("precipitation", {enum: ["snow", "rain", "none"]}),
    imagePath: text("image_path"),
    createdAt: integer("created_at", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`)
})



export const outfits = sqliteTable("outfits", {
    id: integer("id").primaryKey({autoIncrement: true}),
    name: text("name"),
    createdAt: integer("created_at", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
    source: text("source", {enum: ["manual", "generated"]}).notNull()
})

export const outfitItems = sqliteTable("outfit_items", {
    outfitId: integer("outfit_id").references(() => outfits.id).notNull(),
    itemId: integer("item_id").references(() => items.id).notNull()
}, (table) => ({
    pk: primaryKey({ columns: [table.outfitId, table.itemId] })
})

);

export const wearEvents = sqliteTable("wear_events", {
    id: integer("id").primaryKey({autoIncrement: true}),
    outfitId: integer("outfit_id").references(() => outfits.id).notNull(),
    wornAt: integer("worn_at", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`)
})


