import { Composer } from "telegraf";
import { profileCommand, settingsCommand } from "./handler";

const composer = new Composer();

composer.command("profile", profileCommand as any);
composer.command("settings", settingsCommand as any);

export { composer }