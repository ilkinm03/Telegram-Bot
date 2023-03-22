import { Composer } from "telegraf";
import { helpHandler, startHandler } from "./handlers";

const composer = new Composer();

composer.start(startHandler as any);
composer.help(helpHandler as any);

export { composer }