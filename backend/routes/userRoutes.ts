import express, { RequestHandler } from "express"
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser as RequestHandler);
userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', deleteUser);

export default userRouter;