import { Telegraf } from "telegraf";
import { MyContext } from "../my-context.interface";
import { EnvConfig } from "../../config/env.config";

const bot = new Telegraf<MyContext>(EnvConfig.telegramBotToken as string);

bot.telegram.setMyCommands(
  [
    {
      command: "start",
      description: "Start the bot",
    },
    {
      command: "help",
      description: "List the commands of what you can do with the bot",
    },
  ],
).then();

export { bot };