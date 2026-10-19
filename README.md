# Outfit recommender

Website to generate outfits based on your closet and preferences.

## Server

The API is an Express server written in TypeScript. It uses Drizzle ORM with
the `better-sqlite3` SQLite driver; the database file defaults to
`data/outfit-recommender.sqlite`.

```sh
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
```

The server exposes `GET /health` to report API and database availability.
Drizzle schema definitions live in `server/src/db/schema.ts`; generated SQL
migrations are stored in `drizzle/`.
