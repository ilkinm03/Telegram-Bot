import { Composer } from "telegraf";
import { profileCommand, registerCommand, settingsCommand } from "./handler";

const composer = new Composer();

composer.command("profile", profileCommand as any);
composer.command("settings", settingsCommand as any);
composer.command("register", registerCommand as any);

export { composer }