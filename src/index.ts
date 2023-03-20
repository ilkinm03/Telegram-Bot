import express from "express";
import { bot } from "./bot/telegraf";
import { EnvConfig } from "./config/env.config";

const app = express();
const PORT = EnvConfig.port || 3000;

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.listen(PORT, () => {
  bot.launch();
  console.log(`Listening on port ${PORT}...`);
});