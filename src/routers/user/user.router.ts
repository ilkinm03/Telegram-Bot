import { Router } from "express";
import UserController from "../../controllers/user.controller";

const router = Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getUser);

export { router as userRouter };