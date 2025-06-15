import express from "express";
import { getLeaderboard } from "../controllers/leaderboardController";
import { createGame, startGame, checkSubmission, nextIngredient, forfeitGame, restartGame, getGameById  } from "../controllers/gameController";
const router = express.Router();

router.get("/leaderboard", getLeaderboard);
router.post("/", createGame);
router.get("/:gameId", getGameById)
router.post("/Start/:gameId",startGame);
router.post("/:gameId/submit", checkSubmission);
router.post("/:gameId/next", nextIngredient);
router.post("/:gameId/forfeit", forfeitGame);
router.post("/:gameId/restart", restartGame);
export default router;