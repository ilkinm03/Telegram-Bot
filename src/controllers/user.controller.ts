import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

class UserController {
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).send({
        message: "user was created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();