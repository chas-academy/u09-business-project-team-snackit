"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forfeitGame = exports.nextIngredient = exports.checkSubmission = exports.startGame = exports.createGame = void 0;
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // create an instance for game (?)
    // if user press start call startGame
    // if user press go back to lobby, end game and redirect to lobby
});
exports.createGame = createGame;
const startGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get a random recipe
    // get a random ingredient from random chosen recipe
    // print out random ingredient
});
exports.startGame = startGame;
const checkSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find recipe by users entered submission
    // if not found print out "lost" and "winner" to the opponent
    // win++ for user who is winner
    // if recipe found print out "correct" and add to score (if 3 recipes is in chain, score is 3)
    // give turn to next
});
exports.checkSubmission = checkSubmission;
const nextIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find recipes by ingredient
    // select a random ingredient from players chosen recipe
    // print out new random ingredient
});
exports.nextIngredient = nextIngredient;
const forfeitGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if user press end in the middle of game, redirect to winning page
    // log win++ for user who is winner
});
exports.forfeitGame = forfeitGame;
// ENDGAME (show winning page)
// if user press play again, restart game
// if user press end, go to game lobby
