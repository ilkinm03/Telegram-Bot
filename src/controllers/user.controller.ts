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

  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await UserService.getUser(req.query);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  public deactivateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await UserService.deactivateUser(req.body.email);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();