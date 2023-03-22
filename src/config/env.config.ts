const dotenv = require("dotenv");
dotenv.config();

export abstract class EnvConfig  {
  static telegramBotToken?: string = process.env.TELEGRAM_BOT_TOKEN;
  static port?: number = process.env.PORT as unknown as number;
  static mongoURI?: string = process.env.MONGO_URI;
}