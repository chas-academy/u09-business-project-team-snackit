import mongoose, {Document, Schema} from "mongoose";

export interface IGame extends Document {
    players: string[];
    currentTurn: string;
    currentIngredient: string;
    lives: {[playerId: string]: number};
    score: number;  // räknar hur många gånger spelarna har svarat rätt, vid fel 0-ställs streaket
    status: "waiting" | "playing" | "finished" ;
    winner: string;
    loser: string;
}


const gameSchema: Schema = new Schema ({
    players: {type: [String], required: true},
    currentTurn: { type: String, required: true },
    currentIngredient: { type: String, required: false},
    lives: {type: Object, required: true, default: {}},  // visar antalet liv spelare har kvar 
    score: {type: Number, required: true, default: 0},
    status: {type: String, enum: ["waiting", "playing", "finished"], default: "waiting"},  // visar spelets tilstånd 
    winner: { type: String, default: ""},
    loser: {type: String, default: ""},
})

export const Game = mongoose.model<IGame>("Game", gameSchema);