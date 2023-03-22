import { Composer } from "telegraf";
import { MyContext } from "../my-context.interface";
import {
  emailHandler,
  firstNameHandler,
  lastNameHandler,
  phoneHandler,
} from "./handler";

const composer = new Composer<MyContext>();

composer.hears(/^\w+$/i, async(ctx) => {
  switch (ctx.session.__state) {
    case "FIRST_NAME":
      await firstNameHandler(ctx as MyContext);
      break;
    case "LAST_NAME":
      await lastNameHandler(ctx as MyContext);
      break;
    case "EMAIL":
      await ctx.reply("Please enter a valid email address.");
      break;
    case "PHONE":
      await phoneHandler(ctx as MyContext);
      break;
    default:
      throw new Error("There no such session!");
  }
});

composer.hears(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, async(ctx) => {
  await emailHandler(ctx as MyContext);
})

export { composer };