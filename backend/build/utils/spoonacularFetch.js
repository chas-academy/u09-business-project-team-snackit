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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRecipe = exports.getRandomIngredients = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const getRandomIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = process.env.SPOONCULAR_API_KEY;
    try {
        const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;
        const response = yield (0, cross_fetch_1.default)(url);
        const data = yield response.json();
        const recipe = data.recipes[0];
        const ingredients = recipe.extendedIngredients;
        // console.log(recipe)
        //Filtrerar bort dem här ingredienserna
        const excludedAisles = [
            "spices and seasonings",
            "oil, vinegar, salad dressing",
            "baking",
        ];
        const filteredIngredients = ingredients.filter((ing) => {
            //Filtrerar bort basic ingredienser som skrivet uppe.
            const aisle = ing.aisle.toLowerCase().trim();
            //   console.log(aisle)
            //   console.log(excludedAisles.includes(aisle))
            // Gör om namnet på ingredienseran till småbokstäver och tarbort mellanrumm
            return !excludedAisles.includes(aisle); // Returerar true om namnet inte finns med i excludedIngredients annars falsk.
        });
        // console.log(filteredIngredients)
        if (filteredIngredients.length === 0) {
            throw new Error("This ingredient is not valid, try again!");
        }
        // console.log(filteredIngredients)
        const lastIngredient = filteredIngredients[filteredIngredients.length - 3].name; // Hämtar namnet på sista ingrediensen i från listan
        return {
            title: recipe.title,
            image: recipe.image,
            usedIngredient: lastIngredient,
        };
    }
    catch (error) {
        console.error("Theres been an error with Spooncular API", error);
        throw new Error("We failed to fetch random recipe");
    }
});
exports.getRandomIngredients = getRandomIngredients;
const searchRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = process.env.SPOONCULAR_API_KEY;
    const { input } = req.body;
    try {
        const data = yield (0, cross_fetch_1.default)(`https://api.spoonacular.com/recipes/autocomplete?number=10&query=${input}&apiKey=${apiKey}`);
        const recipes = yield data.json();
        const recipeTitles = recipes.map((data) => data.title);
        // console.log(recipeTitles)
        return res.status(200).json({ Titles: recipeTitles });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("No recipe found: ", err);
        }
    }
});
exports.searchRecipe = searchRecipe;
