import { BotCommand, MyContext } from "../my-context.interface";
import { helpHTML, startHTML } from "./html";
import { Markup } from "telegraf";

export const startHandler = async (ctx: MyContext) => {
  try {
    await ctx.replyWithHTML(startHTML(ctx));
    ctx.session.__state = "FIRST_NAME";
  } catch (error) {
    throw error;
  }
};

export const helpHandler = async (ctx: MyContext) => {
  try {
    const commands: BotCommand[] = await ctx.telegram.getMyCommands();
    let cmdArray: string[] = [];
    for (const cmd of commands) {
      cmdArray.push(`/${cmd.command}`);
    }
    await ctx.reply("Here are the all commands for A Truck Bot.", Markup
      .keyboard(cmdArray)
      .oneTime()
      .resize(),
    );
    return ctx.replyWithHTML(helpHTML(commands));
  } catch (error) {
    throw error;
  }
}