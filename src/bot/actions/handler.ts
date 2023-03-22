import { MyContext } from "../my-context.interface";
import { profileHTML } from "./html";
import { Markup } from "telegraf";

export const profileActionHandler = (ctx: MyContext<any>) => {
  const {
    firstName,
    lastName,
    email,
    phone,
  } = ctx.session;
  const body = {
    firstName,
    lastName,
    email,
    phone,
  };
  return ctx.replyWithHTML(profileHTML(body));
};

export const settingsActionHandler = async (ctx: MyContext<any>) => {
  await ctx.reply("Delete account", Markup.inlineKeyboard([
    Markup.button.callback("Delete account", "delete"),
  ]));
};

export const deleteActionHandler = async (ctx: MyContext<any>) => {

};