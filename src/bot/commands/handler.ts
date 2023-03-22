import { MyContext } from "../my-context.interface";
import { Markup } from "telegraf";

export const profileCommand = async (ctx: MyContext) => {
  try {
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
  } catch (error) {
    throw error;
  }
}

export const settingsCommand = async (ctx: MyContext<any>) => {
  try {
    await ctx.reply("Delete account", Markup.inlineKeyboard([
      Markup.button.callback("Delete account", "delete"),
    ]));
  } catch (error) {
    throw error;
  }
}