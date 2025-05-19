import { Request, Response } from "express"

export const createGame = async (req: Request, res: Response) => {
    // create an instance for game (?)
    // if user press start call startGame
    // if user press go back to lobby, end game and redirect to lobby

}

export const startGame = async (req: Request, res: Response) => {
    // get a random recipe
    // get a random ingredient from random chosen recipe
    // print out random ingredient
}

export const checkSubmission = async (req: Request, res: Response) => {
    // find recipe by users entered submission
    // if not found print out "lost" and "winner" to the opponent
    // win++ for user who is winner
    // if recipe found print out "correct" and add to score (if 3 recipes is in chain, score is 3)
    // give turn to next
}

export const nextIngredient = async (req: Request, res: Response) => {
    // find recipes by ingredient
    // select a random ingredient from players chosen recipe
    // print out new random ingredient
}
export const forfeitGame = async (req: Request, res: Response) => {
    // if user press end in the middle of game, redirect to winning page
    // log win++ for user who is winner
}


    // ENDGAME (show winning page)

    // if user press play again, restart game
    // if user press end, go to game lobby
