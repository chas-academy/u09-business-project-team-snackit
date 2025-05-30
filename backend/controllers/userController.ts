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
    }
}