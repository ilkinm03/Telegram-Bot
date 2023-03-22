import { MyContext } from "../my-context.interface";
import { startHTML } from "./html";

export const startHandler = async (ctx: MyContext) => {
  try {
    await ctx.replyWithHTML(startHTML(ctx));
    ctx.session.__state = "FIRST_NAME";
  } catch (error) {
    throw error;
  }
};