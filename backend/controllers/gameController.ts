import { Request, Response } from "express"
import { Game } from "../models/gameModel";
import { getRandomIngredients } from "../utils/spoonacularFetch";
import { User } from "../models/userModel";
import fetch from 'cross-fetch';

export const createGame = async (req: Request, res: Response) => {

    try {
        const { player1, player2 } = req.body;

        const user1 = await User.findById(player1);
        const user2 = await User.findById(player2);

        if (!user1 || !user2) {
            return res.status(404).json({error: "One or both players not found"});
        }

        const newGame = await Game.create({
            players: [player1,  player2],          // Använder spelarnas id:n från databasen
            currentTurn: player1,
            currentIngredient: "",                    // tomt tills startGame kallas
            lives: {
                [player1]: 3,
                [player2]: 3,
            },
            score: 0,                                 // räknar hur många gånger spelarna har svarat rätt
            status: "waiting",                        // visar spelets status, tills startGame hämtas
            winner: "",
            loser: "",
        });
       res.status(201).json({ message: "Game created. Ready to start.", gameId: newGame._id });
        
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    };
        // create an instance for game (?)
        // if user press start call startGame
        // if user press go back to lobby, end game and redirect to lobby
};
    


export const startGame = async (req: Request, res: Response) => {
    try {
        const gameId = req.params.gameId;
        const spoonData = await getRandomIngredients();
        const game = await Game.findByIdAndUpdate ( gameId, {
            currentIngredient: spoonData.usedIngredient, status: "playing",
        }, 
            {new: true}
        );

        if (!game) {
            return res.json(404).json({error: "This game not found"});
        }
        res.status(200).json(game);
    
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    };
    // get a random recipe
    // get a random ingredient from random chosen recipe
    // print out random ingredient
}

export const checkSubmission = async (req: Request, res: Response) => {

    console.log("")

    const { gameId } = req.params;
    const { playerId, submittedRecipe } = req.body;

    if (!submittedRecipe) {
        return res.status(400).json({error: "You have to fill in a recipe!" })
    }
    
    try {
        const game = await Game.findById(gameId);     // Hämtar spelet med spelId
        if (!game) {
            return res.status(404).json({error: "This game not found"});
        }

        if (game.currentTurn.toString() !== playerId) {           // Kollar om det är spelaranes tur
            return res.status(403).json({ error: "It's not your turn!"});
        }
        
        const apiKey = process.env.SPOONCULAR_API_KEY;             
        const recipeSerachUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${submittedRecipe}&apiKey=${apiKey}`;    // Söker recept i api:et med spelarens inmatning!
        const recipeSerachResponse = await fetch(recipeSerachUrl);      // Hämtar receptet från api:et
        const recipeSerachData = await recipeSerachResponse.json(); 

        if (!recipeSerachData.results || recipeSerachData.results.length ===0) {
            return res.status(404).json({ error: " Whap whap, you wrote in a wrong recipe!"})
        }

        const recipeId = recipeSerachData.results[0].id;     // Hämtar id:et på receptet som spelaren matat in

        // Hämtar detaljerad info om receptet med alla ingredienser
        const recipeInfoUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
        const recipeInfoResponse = await fetch(recipeInfoUrl); 
        const recipeInfoData = await recipeInfoResponse.json();

        const ingredients = recipeInfoData.extendedIngredients.map((ing: any) => ing.name.toLowerCase().trim());
        const requiredIngredient = game.currentIngredient.toLowerCase().trim();
        const ingredientIsCorrect = ingredients.includes(requiredIngredient);
        
        const opponentId = game.players.find((id) => id.toString() !== playerId);
        if (!opponentId) {
            return res.status(404).json({ error: " This opponent not found!" });
        }

        if (!ingredientIsCorrect) {
            game.lives[playerId.toString()] -= 1;           // minskar spelarens liv med 1
            console.log(`Player ${playerId.toString()} lost a life. Lives left: ${game.lives[playerId.toString()]}`);
            game.markModified('lives');
            


            if (game.lives[playerId.toString()] <= 0) {

                game.status = "finished";
                game.winner = opponentId;
                game.loser = playerId; 
                        
                await User.findByIdAndUpdate(opponentId, { $inc: { wins: 1 } });           // Ökar spelarens vinst med 1
                await User.findByIdAndUpdate(playerId, { $inc: { losses: 1 } });       // Ökar motståndarens förlust med 1
                       
                game.markModified('lives');
                await game.save(); 
                return res.status(200).json({ result: "finished", message: "Game over! You lost !", winner: opponentId, score: game.score});
            }
    
            await game.save(); 
            return res.status(200).json({ result: "lost", message: `The recipe doesn't include "${requiredIngredient}! You lost this round!`, winner: opponentId, score: game.score});
        }

        game.score += 1;                                   // ökar spelarnas streak med 1
        game.lives[opponentId.toString()] -=1;             // minskar motståndarens liv med 1

        game.markModified('lives');
        await game.save();
        return res.status(200).json({ result: "correct", message: `Correct! The ingredient was included.`,lives: game.lives, score: game.score, });
            
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    };
    
    // find recipe by users entered submission
    // if not found print out "lost" and "winner" to the opponent
    // win++ for user who is winner
    // if recipe found print out "correct" and add to score (if 3 recipes is in chain, score is 3)
    // give turn to next
};

export const nextIngredient = async (req: Request, res: Response) => {

    const { gameId } = req.params;

    try {
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ error: "This game not found"});
        }

        const nextTurn = game.players.find(id => id.toString() !==game.currentTurn.toString());
        if (!nextTurn) { 
            return res.status(400).json({ error: "Player two is not found"});
        }

        const spoonData = await getRandomIngredients();          // Hämtar en ny ingrediens från Spooncular api:et
        game.currentTurn = nextTurn;                             // Byter tur till motståndaren
        game.currentIngredient = spoonData.usedIngredient;       // Lägger till en ny ingrediens i spelet

        await game.save();                 
        return res.status(200).json({ message: "Here is the next ingredient", nextTurn, nextIngredient: spoonData.usedIngredient, lives: game.lives});          

    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }
    
    // find recipes by ingredient
    // select a random ingredient from players chosen recipe
    // print out new random ingredient

};

    

export const forfeitGame = async (req: Request, res: Response) => {

    const {gameId} = req.params;
    const { playerId} = req.body;

    try{
        const game = await Game.findById(gameId);
        if(!game) {
            return res.status(200).json({error: "This game not found"});
        }

        if (!game.players.map(id => id.toString()).includes(playerId)) {                         //kontrollerar att spelaren är med i spelet
            return res.status(403).json({error: "You are not a player in this game"});
        }

        const opponentId = game.players.find(id => id.toString() !== playerId);
        if (!opponentId) { 
            return res.status(404).json({ error: " This opponent not found!" });
        }


        // Uppdaterar spelets status 
        game.status = "finished";
        game.winner = opponentId;
        game.loser = playerId;

        // Uppdaterar spelaranas statistic
        await User.findByIdAndUpdate(opponentId, { $inc: { wins: 1 } });           
        await User.findByIdAndUpdate(playerId, { $inc: { losses: 1 } });  

        await game.save();
        return res.status(200).json({message: "You forfeited the game, you lost and you opponent won!", winner: opponentId});

    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }

    // if user press end in the middle of game, redirect to winning page
    // log win++ for user who is winner
}


export const restartGame = async (req: Request, res: Response) => {

    const { gameId } = req.params;

    try {
        const oldGame = await Game.findById(gameId);
        if (!oldGame) {        // Kontrollerar att spelet är avslutat och för att kunna starta om spelet med samma spelare igen
            return res.status(404).json({ error: "This game not found"});
        }

        const players = oldGame.players;
        const startLives = {
            [players[0].toString()]: 3,
            [players[1].toString()]: 3,
        };

        const spoonData = await getRandomIngredients();
        
        const newGame = await Game.create({      // Skapar nytt spel
            players,
            currentTurn: players[0],
            currentIngredient: spoonData.usedIngredient,
            score: 0,
            lives: startLives,
            status: "playing",
            winner: "",
            loser: "",
        });

        await newGame.save();
        return res.status(201).json({ message: "New game started", gameId: newGame._id, nextIngredient: newGame.currentIngredient});

    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({error: err.message});
            return;
        }
    }

    // ENDGAME (show winning page)

    // if user press play again, restart game
    // if user press end, go to game lobby
}