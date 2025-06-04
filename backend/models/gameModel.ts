import mongoose, {Document, Schema} from "mongoose";

export interface IGame extends Document {
    players: string[];
    currentTurn: string;
    currentIngredient: string;
    lives: {[playerId: string]: number};
    status: "playing" | "finished" ;
    winner: string;
    loser: string;
}


const gameSchema: Schema = new Schema ({
    players: {type: [String], required: true},
    currentTurn: { type: String, required: true },
    currentIngredient: { type: String, required: true},
    lives: {type: Map, of: Number, required: true},  // visar antalet liv spelare har kvar 
    status: {type: String, enum: ["playing", "finished"], default: "playing"},  // visar spelets tilstånd 
    winner: { type: String, requred: true},
    loser: {type: String, required: true},
})

export const Game = mongoose.model<IGame>("Game", gameSchema);