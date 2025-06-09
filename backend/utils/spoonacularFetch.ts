import express, {Request, Response} from "express";
import fetch from 'cross-fetch';




export const getRandomIngredients = async (): Promise<{title: string; image: string; usedIngredient: string;}> => {
    const apiKey= process.env.SPOONCULAR_API_KEY;

    try {
        const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}&exclude-tags=dessert,drink`;
        

        const response = await fetch(url);
        const data = await response.json();
        
        const recipe = data.recipes[0];
        const ingredients = recipe.extendedIngredients;
        
        //Filtrerar bort dem här ingredienserna 
        const excludedIngredients = ["salt", "black pepper", "white pepper", "sugar", 
            "water", "oil", "olive oil", "vegetable oil", "seasoning", "spices", 
            "chilli flakes", "garlic powder", "onion powder", "bouillon", "stock", 
            "coocking spray", "baking powder", "baking soda", "cornstarch", "curry",
            "paprika", "oregano", "ground pepper" , "sugar", "coffe", "vanilla", "salt and pepper", 
            "vegetable stock", "honey", "butter", "xanthan gum", "nutritional yeast flakes", "whipped cream",
            "chive blossoms", "vanilla extract", "sea salt and pepper", "salt and pepper to tatse", "stock cube", 
            "pepper", "nutmeg", "cocoa powder", "steel-cut oats", "cinnamon", "cream", "extra virgin olive oil", 
            "pear liqueur", "optional: lemon", "condensed milk", "kosher salt", "seasoned salt", "brown sugar",
            "salt& pepper", "sprinkles", "vanilla essence", "combine everything in a bowl and chill", "tablespoons scallions", 
            "ice cream", "tea spoon of vanilla extract", "cake mix", "oreo", "ice water", "chocolate vanilla swirl marshmallows", 
            "sea salt", "non-fat milk", "chocolate", "milk", "until deep golden brown. remove bread from pan", "s&p", 
            "ground", "vegetable bouillon cube", "margarine", "maple syrup", "pan drippings from roast beef preferably", 
            "whipping cream", "nuts such as walnuts", "lemon juice","at least of turkey bacon", "vanilla bean", "walnuts", "of", "pepper flakes", "flour", "rolled oats", "chocolate bar", "may not be heavy handed" ]

            const filteredIngredients = ingredients.filter((ing: {name: string}) => {    //Filtrerar bort basic ingredienser som skrivet uppe.
            const name = ing.name.toLowerCase().trim();                              // Gör om namnet på ingredienseran till småbokstäver och tarbort mellanrumm
            return !excludedIngredients.includes(name);                              // Returerar true om namnet inte finns med i excludedIngredients annars falsk. 
        });


        if(filteredIngredients.length ===0) {
            throw new Error("This ingredient is not valid, try again!");
        }

        
        const lastIngredient = filteredIngredients[filteredIngredients.length -1].name    // Hämtar namnet på sista ingrediensen i från listan

        return {
            title: recipe.title,
            image: recipe.image,
            usedIngredient: lastIngredient
        };

    }catch (error) { 
        console.error("Theres been an error with Spooncular API", error);
        throw new Error("We failed to fetch random recipe");
    }
};

