import { Request, Response } from "express"
import { User } from "../models/userModel"

export const getLeaderboard = async (req: Request, res: Response) => {
    try{
        const topPlayers = await User.find()
        .sort({wins: -1})
        .limit(6);
        res.status(200).json(topPlayers);
    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
    // find all users
    // sort by where win is the highest
}