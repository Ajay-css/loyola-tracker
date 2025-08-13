import express from "express";
import { login, logout, register } from "../controllers/userController.js";

const userRouter = express.Router();

// Example route for user authentication

userRouter.post("/login", login);

userRouter.post("/register", register);

userRouter.post("/logout", logout);

export default userRouter;
