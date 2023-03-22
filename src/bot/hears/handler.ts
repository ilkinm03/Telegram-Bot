import { MyContext } from "../my-context.interface";
import { Markup } from "telegraf";


export const firstNameHandler = async (ctx: MyContext<any>) => {
  ctx.session.firstName = ctx.message.text;
  ctx.session.__state = "LAST_NAME";
  await ctx.reply("Please provide your last name.");
};

export const lastNameHandler = async (ctx: MyContext<any>) => {
  ctx.session.lastName = ctx.message.text;
  ctx.session.__state = "EMAIL";
  await ctx.reply("Please provide your email address.");
};

export const emailHandler = async (ctx: MyContext<any>) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm;
  if (!emailRegex.test(ctx.message.text)) {
    await ctx.reply("Please enter a valid email address.");
  } else {
    ctx.session.email = ctx.session.__state === "EMAIL" ? ctx.message.text : "";
    ctx.session.__state = "PHONE";
    await ctx.reply("Please provide you phone number.");
  }
};

export const phoneHandler = async (ctx: MyContext<any>) => {
  const phoneRegex = /^(\+\d{1,3})\d{9}|\d{10}$/gm;
  if (!phoneRegex.test(ctx.message.text)) {
    await ctx.reply("Please enter a valid phone number");
  } else {
    ctx.session.phone = ctx.message.text;
    ctx.session.__state = "POST_REGISTER"
    await ctx.reply("Please select an option:", Markup.inlineKeyboard([
      Markup.button.callback("My Profile", "profile"),
      Markup.button.callback("Settings", "settings"),
    ]));
  }
}