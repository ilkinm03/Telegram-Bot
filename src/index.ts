import express from "express";
import { bot } from "./bot/telegraf";
import { EnvConfig } from "./config/env.config";
import { mongoConnection } from "./databases/db";
import router from "./routers";
import { sentryConfig, sentryErrorHandler } from "./config/sentry.config";

const app = express();
const PORT = EnvConfig.port || 3000;

app.use(express.json());
sentryConfig(app);

app.get("/hello", (_req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

router(app);
sentryErrorHandler(app);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}...`);
  await mongoConnection();
  await bot.launch();
});

process.on("SIGINT", () => {
  bot.stop("SIGINT");
})
process.on("SIGTERM", () => {
  bot.stop("SIGTERM");
})

export default app;