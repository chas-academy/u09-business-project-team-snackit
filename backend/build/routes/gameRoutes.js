"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaderboardController_1 = require("../controllers/leaderboardController");
const gameController_1 = require("../controllers/gameController");
const router = express_1.default.Router();
router.get("/leaderboard", leaderboardController_1.getLeaderboard);
router.post("/", gameController_1.createGame);
router.get("/:gameId", gameController_1.getGameById);
router.post("/Start/:gameId", gameController_1.startGame);
router.post("/:gameId/submit", gameController_1.checkSubmission);
router.post("/:gameId/next", gameController_1.nextIngredient);
router.post("/:gameId/forfeit", gameController_1.forfeitGame);
router.post("/:gameId/restart", gameController_1.restartGame);
exports.default = router;
