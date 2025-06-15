import express, { Request, Response } from "express";
import fetch from "cross-fetch";

export const getRandomIngredients = async (): Promise<{
  title: string;
  image: string;
  usedIngredient: string;
}> => {
  const apiKey = process.env.SPOONCULAR_API_KEY;

  try {
    const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const recipe = data.recipes[0];
    const ingredients = recipe.extendedIngredients;
    // console.log(recipe)

    //Filtrerar bort dem här ingredienserna

    const excludedAisles = [
      "spices and seasonings",
      "oil, vinegar, salad dressing",
      "baking",
    ];

    const filteredIngredients = ingredients.filter((ing: { aisle: string }) => {
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
    const lastIngredient =
      filteredIngredients[filteredIngredients.length - 3].name; // Hämtar namnet på sista ingrediensen i från listan

    return {
      title: recipe.title,
      image: recipe.image,
      usedIngredient: lastIngredient,
    };
  } catch (error) {
    console.error("Theres been an error with Spooncular API", error);
    throw new Error("We failed to fetch random recipe");
  }
};

export const searchRecipe = async (req: Request, res: Response) => {
  const apiKey = process.env.SPOONCULAR_API_KEY;
    const { input } = req.body

  try {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/autocomplete?number=10&query=${input}&apiKey=${apiKey}`
    );

    const recipes = await data.json();
    const recipeTitles = recipes.map((data: { title: any; }) => data.title);
   
    // console.log(recipeTitles)

    return res.status(200).json({Titles: recipeTitles});

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("No recipe found: ", err);
    }
  }
};
