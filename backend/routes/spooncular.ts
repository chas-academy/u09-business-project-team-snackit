import express, {Request, response, Response} from "express";
import dotenv  from "dotenv";
import fetch from 'cross-fetch';


dotenv.config();

const router = express.Router();

router.get("/recipes", async (req, res ) => {
    const apiKey= process.env.SPOONCULAR_API_KEY;

    try {
        const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    }catch (error) { 
        console.error("Theres been an error with Spooncular API", error);
        res.status(500).json({error: "We failed to fetch random recipe"})
    }
});



export default router;
