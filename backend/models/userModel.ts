import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    wins: number;
    losses: number;
    googleId: string;
    // gamesPlayed?: number;
}

const userSchema: Schema = new Schema ({
    name: { type: String, required: true,},
    email: {type: String, required: true},
    password: {type: String, required: true},
    wins: {Type: Number},
    losses: {Type: Number},
    googleID: {Type: String},
    // gamesPlayed: { type: Number, default: 0 }
})

export const User = mongoose.model<IUser>("User", userSchema);