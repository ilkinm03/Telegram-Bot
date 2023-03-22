import { session } from "telegraf";
import { bot } from "./config/bot.config";
import { composer as start } from "./start";
import { composer as commands } from "./commands";
import { composer as hears } from "./hears";
import { composer as actions } from "./actions";

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
bot.use(actions);
bot.use(commands);
bot.use(hears);

export { bot };