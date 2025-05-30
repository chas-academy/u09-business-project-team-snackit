import express from "express"
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/', getUser);
userRouter.post('/', createUser);
userRouter.put('/', updateUser);
userRouter.delete('/', deleteUser);

export default userRouter;