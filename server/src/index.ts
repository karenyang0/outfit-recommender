import "dotenv/config";
import express from "express";
import { sqlite } from "./db/index.js";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  sqlite.prepare("SELECT 1 AS ok").get();
  res.json({ status: "ok", database: "connected" });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.info(`Server listening on http://localhost:${port}`);
});
