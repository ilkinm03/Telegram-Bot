import { Markup, session } from "telegraf";
import { bot } from "./config/bot.config";
import { composer as start } from "./start";
import { composer as commands } from "./commands";
import { composer as hears } from "./hears";

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

bot.use(start)
bot.use(commands);
bot.use(hears);

bot.action("profile", (ctx) => {
  //! A handler is required to verify whether the user has registered or not.
  const {
    firstName,
    lastName,
    email,
    phone,
  } = ctx.session;
  return ctx.reply(`
  Here' your account information:
  \nFirst name: ${firstName}
  \nLast name: ${lastName}
  \nEmail: ${email}
  \nPhone: ${phone}
  `);
});

bot.action("settings", (ctx) => {
  ctx.reply("Delete account", Markup.inlineKeyboard([
    Markup.button.callback("Delete account", "delete"),
  ]));
})

export { bot };