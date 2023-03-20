import { Telegraf, session } from "telegraf";
import { EnvConfig } from "../config/env.config";
import { MyContext } from "./my-context.interface";

const bot = new Telegraf<MyContext>(EnvConfig.telegramBotToken as string);
bot.use(session({
  defaultSession: () => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      __state: "",
    };
  },
}));

bot.start((ctx) => {
  ctx.reply("Welcome to A Truck Telegram Bot!");
  ctx.reply("Please provide your first name.");
  ctx.session.__state = "FIRST_NAME";
});

bot.hears(/^[a-zA-Z]+$/i, (ctx) => {
  const { __state: state } = ctx.session;
  switch (state) {
    case "FIRST_NAME":
      ctx.session.__state = "LAST_NAME";
      ctx.reply("Please provide your last name.");
      ctx.session.firstName = ctx.message.text;
      break;
  }
});


export { bot };