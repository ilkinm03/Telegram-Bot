import { BotCommand, MyContext } from "../my-context.interface";

export const startHTML = (ctx: MyContext): string => {
  return `
<strong>Hello ${ctx.message!.from.first_name}!</strong>\nWelcome to A Truck Telegram Bot!
To use the bot you need to register first.\n
Please provide your first name.
  `;
};

export const helpHTML = (commands: BotCommand[]): string => {
  let text = "";
  for (const cmd of commands) {
    text += `/${cmd.command} - ${cmd.description}\n`;
  }
  return text;
};