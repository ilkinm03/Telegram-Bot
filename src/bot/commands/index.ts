import { Composer } from "telegraf";
import { profileCommand } from "./handler";

const composer = new Composer();

composer.command("profile", profileCommand as any);

export { composer }