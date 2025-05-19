import mongoose, {Document, Schema} from "mongoose";

export interface IGame extends Document {
    winner: string;
    loser: string;
}


const gameSchema: Schema = new Schema ({
    winner: { type: String, requred: true},
    loser: {type: String, required: true},
})

export const Game = mongoose.model<IGame>("Game", gameSchema);