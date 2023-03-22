import { Markup, session } from "telegraf";
import { bot } from "./config/bot.config";
import { composer as start } from "./start";

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

bot.command("help", (ctx) => {
  return ctx.reply("Here are the all commands for A Truck Bot.", Markup
    .keyboard([
      ["/start", "/profile", "/help"],
    ])
    .oneTime()
    .resize(),
  );
});

bot.command("profile", (ctx) => {
  const {
    firstName,
    lastName,
    email,
    phone,
  } = ctx.session;
  if (!firstName || !lastName || !email || !phone) {
    return ctx.reply(
      "You don't have an account. Please register for using this command.");
  }
  return ctx.reply(`
    First name: ${firstName}\nLast name: ${lastName}\nEmail: ${email}\nPhone: ${phone}
  `);
});

bot.action("profile", (ctx) => {
  //! A handler is required to verify whether the user has registered or not.
  const {
    firstName,
    lastName,
    email,
    phone,
  } = ctx.session;
  return ctx.reply(`
  Here' your account information:
  \nFirst name: ${firstName}
  \nLast name: ${lastName}
  \nEmail: ${email}
  \nPhone: ${phone}
  `);
});

bot.action("settings", (ctx) => {
  ctx.reply("Delete account", Markup.inlineKeyboard([
    Markup.button.callback("Delete account", "delete"),
  ]));
})

bot.hears(/^\w+$/i, (ctx) => {
  const { __state: state } = ctx.session;
  switch (state) {
    case "FIRST_NAME":
      ctx.session.__state = "LAST_NAME";
      ctx.reply("Please provide your last name.");
      ctx.session.firstName = ctx.message.text;
      break;
    case "LAST_NAME":
      ctx.session.__state = "EMAIL";
      ctx.reply("Please provide your email.");
      ctx.session.lastName = ctx.message.text;
      break;
    // Invalid email handling
    case "EMAIL":
      ctx.reply("Please enter a valid email address.");
      break;
    // Invalid phone handling
    case "PHONE":
      const phoneRegex = /^(\+\d{1,3})\d{9}|\d{10}$/gm;
      if (!phoneRegex.test(ctx.message.text)) {
        ctx.reply("Please enter a valid phone number");
      } else {
        ctx.session.phone = ctx.message.text;
        ctx.session.__state = "POST_REGISTER"
        ctx.reply("Please select an option:", Markup.inlineKeyboard([
          Markup.button.callback("My Profile", "profile"),
          Markup.button.callback("Settings", "settings"),
        ]));
      }
      break;
    default:
      break;
  }
});

bot.hears(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, (ctx) => {
  const { __state: state } = ctx.session;
  ctx.session.email = state === "EMAIL" ? ctx.message.text : "";
  ctx.reply("Please provide your phone number.");
  ctx.session.__state = "PHONE";
});

export { bot };