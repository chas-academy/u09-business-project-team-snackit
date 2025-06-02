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
        const user = await User.findOne({googleId: req.params.userId});
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
        const { name, email, password, confirmed_password } = req.body;

        const userExists = await User.findOne({ email: email });
        if(userExists) {
            res.status(400).json({message: "User already exists."});
            return;
        }
        const newUser = new User ({ name, email, password, confirmed_password })
        await newUser.save();
        res.status(201).json({message: "New user created."});

    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
}
export const updateUser = async (req: Request, res: Response) => {
    try {
        // Change to the userId is fetched from logged in user
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});
        if(!user) {
            res.status(404).json({message: "User not found"});
            return;
        }
        res.json({message: "User updated"});
    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        // Change to logged in userId
        const user = await User.findByIdAndDelete(req.params.userId);
        if(!user) {
            res.status(404).json({message: "User not found"});
            return;
        }
        res.json({message: "User deleted succesfully."});

    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
}