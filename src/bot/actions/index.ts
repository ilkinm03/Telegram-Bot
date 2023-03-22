import { Composer } from "telegraf";
import { MyContext } from "../my-context.interface";
import {
  deleteActionHandler,
  profileActionHandler,
  settingsActionHandler,
} from "./handler";

const composer = new Composer<MyContext>();

composer.action('profile', profileActionHandler as any);
composer.action("delete", deleteActionHandler as any);
composer.action("settings", settingsActionHandler as any);

export { composer }