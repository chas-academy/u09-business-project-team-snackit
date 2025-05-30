import { Request, Response} from 'express';
import { User } from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password -confirmed_password");
        if(!users || users.length === 0) {
            res.status(404).json({message: "No users found."})
            return;
        }
        res.json(users);
    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        //change this to get userId from the logged in information
        const user = await User.findById(req.params.userId);
        if(!user) {
            res.status(404).json({message: "User not found."});
            return;
        }
        res.json(user);

    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
}
export const createUser = async (req: Request, res: Response) => {
    try {

    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
}
export const updateUser = async (req: Request, res: Response) => {
    try {

    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {

    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
}