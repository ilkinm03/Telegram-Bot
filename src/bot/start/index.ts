import { Composer } from "telegraf";
import { startHandler } from "./handlers";

const composer = new Composer();

composer.start(startHandler as any);

export { composer }