import { Markup, Telegraf, session } from "telegraf";
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

bot.command("help", (ctx) => {
  return ctx.reply("Here are the all commands for A Truck Bot.", Markup
    .keyboard([
      ["/start", "/profile", "/help"],
    ])
    .oneTime()
    .resize(),
  );
});

bot.command("profile", (ctx) => {
  const {
    firstName,
    lastName,
    email,
    phone,
  } = ctx.session;
  if (!firstName || !lastName || !email || !phone) {
    return ctx.reply(
      "You don't have an account. Please register for using this command.");
  }
  return ctx.reply(`
    First name: ${firstName}\nLast name: ${lastName}\nEmail: ${email}\nPhone: ${phone}
  `);
});

bot.hears(/^\w+$/i, (ctx) => {
  const { __state: state } = ctx.session;
  switch (state) {
    case "FIRST_NAME":
      ctx.session.__state = "LAST_NAME";
      ctx.reply("Please provide your last name.");
      ctx.session.firstName = ctx.message.text;
      break;
    case "LAST_NAME":
      ctx.session.__state = "EMAIL";
      ctx.reply("Please provide your email.");
      ctx.session.lastName = ctx.message.text;
      break;
    // Invalid email handling
    case "EMAIL":
      ctx.reply("Please enter a valid email address.");
      break;
    // Invalid phone handling
    case "PHONE":
      const phoneRegex = /^(\+\d{1,3})\d{9}|\d{10}$/gm;
      if (!phoneRegex.test(ctx.message.text)) {
        ctx.reply("Please enter a valid phone number");
      } else {
        ctx.reply("Please select an option:", Markup.inlineKeyboard([
          Markup.button.callback("My Profile", "profile"),
          Markup.button.callback("Settings", "settings"),
        ]));
      }
      break;
    default:
      break;
  }
});

bot.hears(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, (ctx) => {
  const { __state: state } = ctx.session;
  ctx.session.email = state === "EMAIL" ? ctx.message.text : "";
  ctx.reply("Please provide your phone number.")
  ctx.session.__state = "PHONE";
});

export { bot };