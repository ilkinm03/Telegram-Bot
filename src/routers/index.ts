import { userRouter } from "./user/user.router";
import { Application } from "express";

const router = (app: Application) => {
  app.use("/user", userRouter);
};

export default router;
