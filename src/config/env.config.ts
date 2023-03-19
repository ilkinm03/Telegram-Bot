const dotenv = require("dotenv");
dotenv.config();

export abstract class EnvConfig  {
  static telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  static port?: number = process.env.PORT as unknown as number;
}