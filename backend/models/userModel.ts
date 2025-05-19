import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    wins: number;
    losses: number;
    superadmin: boolean;
    // gamesPlayed?: number;
}

const userSchema: Schema = new Schema ({
    name: { type: String, required: true,},
    email: {type: String, required: true},
    password: {type: String, required: true},
    wins: {Type: Number, default: 0},
    losses: {Type: Number, default: 0},
    superadmin: { type: Boolean, default: false},
    // gamesPlayed: { type: Number, default: 0 }
})

export const User = mongoose.model<IUser>("User", userSchema);