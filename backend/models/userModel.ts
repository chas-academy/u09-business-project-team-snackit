import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    wins: number;
    losses: number;
    googleId: string;
    profilePic: string;
}

const userSchema: Schema = new Schema ({
    name: { type: String, required: true,},
    email: {type: String, required: true},
    password: {type: String, required: true},
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    googleId: {type: String, required: true},
    profilePic: {type: String, default: "backend\assets\img_1.svg"}
})

export const User = mongoose.model<IUser>("User", userSchema);