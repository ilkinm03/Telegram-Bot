import { MyContext } from "../my-context.interface";

export const startHTML = (ctx: MyContext): string => {
  return `
<strong>Hello ${ctx.message!.from.first_name}!</strong>\nWelcome to A Truck Telegram Bot!
To use the bot you need to register first.\n
Please provide your first name.
  `;
};