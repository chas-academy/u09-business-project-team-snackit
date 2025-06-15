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
exports.restartGame = exports.forfeitGame = exports.nextIngredient = exports.checkSubmission = exports.startGame = exports.getGameById = exports.createGame = void 0;
const gameModel_1 = require("../models/gameModel");
const spoonacularFetch_1 = require("../utils/spoonacularFetch");
const userModel_1 = require("../models/userModel");
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { player1, player2 } = req.body;
        // Hämtar spelarna från databasen med deras id:en
        const user1 = yield userModel_1.User.findById(player1);
        const user2 = yield userModel_1.User.findById(player2);
        if (!user1 || !user2) {
            return res.status(404).json({ error: "One or both players not found" });
        }
        const newGame = yield gameModel_1.Game.create({
            players: [player1, player2], // Använder spelarnas id:n från databasen
            currentTurn: player1,
            currentIngredient: "", // tomt tills startGame kallas
            lives: {
                [player1.toString()]: 3, //ÄNDRA HÄR OCKSÅ!!
                [player2.toString()]: 3, //ÄNDRA HÄR OCKSÅ!!
            },
            score: 0, // räknar hur många gånger spelarna har svarat rätt
            status: "waiting", // visar spelets status, tills startGame hämtas
            winner: "",
            loser: "",
        });
        res.status(201).json({ message: "Game created. Ready to start.", gameId: newGame._id });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
    ;
});
exports.createGame = createGame;
const getGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameId = req.params.gameId;
        const game = yield gameModel_1.Game.findById(gameId);
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        res.json(game);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
});
exports.getGameById = getGameById;
const startGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameId = req.params.gameId;
        const spoonData = yield (0, spoonacularFetch_1.getRandomIngredients)(); // hämtar en ny ingrediens från Spooncluar api:et
        const game = yield gameModel_1.Game.findByIdAndUpdate(gameId, {
            currentIngredient: spoonData.usedIngredient, status: "playing",
        }, { new: true } // returnerar det uppdaterade spelet
        );
        if (!game) {
            return res.json(404).json({ error: "This game not found" });
        }
        res.status(200).json(game);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
    ;
});
exports.startGame = startGame;
const checkSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.params;
    const { playerId, submittedRecipe } = req.body;
    if (!submittedRecipe) {
        return res.status(400).json({ error: "You have to fill in a recipe!" });
    }
    try {
        const game = yield gameModel_1.Game.findById(gameId); // Hämtar spelet med spelId
        if (!game) {
            return res.status(404).json({ error: "This game not found" });
        }
        if (game.currentTurn.toString() !== playerId.toString()) { // Kollar om det är spelaranes tur
            return res.status(403).json({ error: "It's not your turn!" });
        }
        const opponentId = game.players.find((id) => id.toString() !== playerId);
        if (!opponentId) {
            return res.status(404).json({ error: "This opponent not found!" });
        }
        const apiKey = process.env.SPOONCULAR_API_KEY;
        const recipeSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${submittedRecipe}&apiKey=${apiKey}`; // Söker recept i api:et med spelarens inmatning!
        const recipeSearchResponse = yield fetch(recipeSearchUrl); // Hämtar receptet från api:et
        const recipeSearchData = yield recipeSearchResponse.json();
        //--inget recept hittad--
        if (!recipeSearchData || !recipeSearchData.results || recipeSearchData.results.length === 0) {
            game.lives[playerId.toString()] -= 1; // Minskar spelarens liv med 1 om det inte finns något recept
            game.markModified('lives'); // Säger till DB att liv har ändrats och måste sparas
            if (game.lives[playerId.toString()] <= 0) { // ifall spelaren har 0 liv kvar avsluta spelet
                game.status = "finished";
                game.winner = opponentId;
                game.loser = playerId;
                yield userModel_1.User.findByIdAndUpdate(opponentId, { $inc: { wins: 1 } });
                yield userModel_1.User.findByIdAndUpdate(playerId, { $inc: { losses: 1 } });
                yield game.save();
                return res.status(200).json({ result: "finished", message: "Game over! You lost! (Recipe not found)", winner: opponentId, score: game.score
                });
            }
            yield game.save();
            return res.status(200).json({ result: "lost", message: "No recipe found! You lost but try again!", lives: game.lives, score: game.score });
        }
        const recipeId = recipeSearchData.results[0].id; // Hämtar id:et på receptet som spelaren matat in
        // Hämtar detaljerad info om receptet med alla ingredienser
        const recipeInfoUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
        const recipeInfoResponse = yield fetch(recipeInfoUrl);
        const recipeInfoData = yield recipeInfoResponse.json();
        const ingredients = recipeInfoData.extendedIngredients.map((ing) => ing.name.toLowerCase().trim()); // hämtar alla ingredienser i receptet och gör dem till små bokstäver och tar bort mellanslag
        const requiredIngredient = game.currentIngredient.toLowerCase().trim();
        const ingredientIsCorrect = ingredients.includes(requiredIngredient); // Kollar ifall den inmatade ingrediensen finns i receptet 
        // const opponentId = game.players.find((id) => id.toString() !== playerId);                                       // hämtar motståndarens id 
        //------Vid fel ingrediens tappar man liv och behåller turen-----
        if (!ingredientIsCorrect) {
            game.lives[playerId.toString()] -= 1; // minskar spelarens liv med 1 om det är fel svar
            game.markModified('lives'); // Säger till DB att liv har ändrats och måste sparas
            if (game.lives[playerId.toString()] <= 0) { // ifall spelaren har 0 liv kvar avsluta spelet
                game.status = "finished";
                game.winner = opponentId;
                game.loser = playerId;
                // Uppdaterar spelaranas statisktik i DB
                yield userModel_1.User.findByIdAndUpdate(opponentId, { $inc: { wins: 1 } }); // Ökar spelarens vinst med 1
                yield userModel_1.User.findByIdAndUpdate(playerId, { $inc: { losses: 1 } }); // Ökar motståndarens förlust med 1
                yield game.save();
                return res.status(200).json({ result: "finished", message: "Game over! You lost !", winner: opponentId, score: game.score
                });
            }
            yield game.save();
            return res.status(200).json({ result: "lost", message: `The recipe doesn't include ${requiredIngredient}!Try again`, score: game.score, lives: game.lives
            });
        }
        //---Vid rätt ingrediens byter tur och ökar csore---
        game.score += 1; // ökar spelarnas streak med 1
        game.currentTurn = opponentId;
        yield game.save();
        return res.status(200).json({ result: "correct", message: `Correct! The ingredient was included.`, lives: game.lives, score: game.score, });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
    ;
});
exports.checkSubmission = checkSubmission;
const nextIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.params;
    try {
        const game = yield gameModel_1.Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ error: "This game not found" });
        }
        const nextTurn = game.players.find(id => id.toString() !== game.currentTurn.toString()); // Hämtar motståndarens id som ska få nästa tur
        if (!nextTurn) {
            return res.status(400).json({ error: "Player two is not found" });
        }
        const spoonData = yield (0, spoonacularFetch_1.getRandomIngredients)(); // Hämtar en ny ingrediens från Spooncular api:et
        game.currentTurn = nextTurn; // Byter tur till motståndaren
        game.currentIngredient = spoonData.usedIngredient; // Lägger till en ny ingrediens i spelet
        yield game.save();
        return res.status(200).json({ message: "Here is the next ingredient", nextTurn, nextIngredient: spoonData.usedIngredient, lives: game.lives });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
});
exports.nextIngredient = nextIngredient;
const forfeitGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.params;
    const { playerId } = req.body;
    try {
        const game = yield gameModel_1.Game.findById(gameId); // hittar spelet med spelId
        if (!game) {
            return res.status(200).json({ error: "This game not found" });
        }
        if (!game.players.map(id => id.toString()).includes(playerId)) { //kontrollerar att spelaren är med i spelet
            return res.status(403).json({ error: "You are not a player in this game" });
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
        yield userModel_1.User.findByIdAndUpdate(opponentId, { $inc: { wins: 1 } });
        yield userModel_1.User.findByIdAndUpdate(playerId, { $inc: { losses: 1 } });
        yield game.save();
        return res.status(200).json({ message: "You forfeited the game, you lost and you opponent won!", winner: opponentId });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
    // if user press end in the middle of game, redirect to winning page
    // log win++ for user who is winner
});
exports.forfeitGame = forfeitGame;
const restartGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.params;
    try {
        const oldGame = yield gameModel_1.Game.findById(gameId);
        if (!oldGame) { // Kontrollerar att spelet är avslutat och för att kunna starta om spelet med samma spelare igen
            return res.status(404).json({ error: "This game not found" });
        }
        const players = oldGame.players; // Hämtar spelarna för förra gamet
        const startLives = {
            [players[0].toString()]: 3,
            [players[1].toString()]: 3,
        };
        const spoonData = yield (0, spoonacularFetch_1.getRandomIngredients)();
        const newGame = yield gameModel_1.Game.create({
            players,
            currentTurn: players[0],
            currentIngredient: spoonData.usedIngredient,
            score: 0,
            lives: startLives,
            status: "playing",
            winner: "",
            loser: "",
        });
        yield newGame.save();
        return res.status(201).json({ message: "New game started", gameId: newGame._id, nextIngredient: newGame.currentIngredient });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
    // ENDGAME (show winning page)
    // if user press play again, restart game
    // if user press end, go to game lobby
});
exports.restartGame = restartGame;
