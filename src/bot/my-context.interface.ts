import { Update } from "telegraf/types";
import { Context } from "telegraf";

export interface MyContext<U extends Update = Update> extends Context<U> {
  session: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    __state: string;
  },
}