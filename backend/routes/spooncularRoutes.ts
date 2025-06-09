import express, {Request, Response} from "express";
import { getRandomIngredients } from "../utils/spoonacularFetch";


const router = express.Router();

router.get("/recipes", async (req: Request, res: Response ) => {
   try{
        const ingrediantData = await getRandomIngredients();
        res.json(ingrediantData);
    }catch (error) { 
        console.error("Theres been an error with Spooncular API", error);
        res.status(500).json({error: "We failed to fetch random recipe"})
    }
});


export default router;
