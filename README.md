[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N68_urbh)  
  
# Who is the foodie?
<img src="/foodie.logo.png" width="200px">  
Are you good with recipes? Do you know the ingredients for lots of recipes? Try you knowledge with "Who is the foodie?".

A two player game, challenge your friend to see who knows the most dishes and their ingredients. 

If you see a new dish during the game, add it to your favorites list!

# How it works
You will get an ingredient, your job is to name a dish using that ingredient.  
Your opponent will then get an ingredient from the dish you named and have to name a dish with that specific ingredient.  
First to not be able to name a dish with the given ingredient will lose! 

Ready to see Who is the foodie?

## How it works behind the scenes
Using the [Spoonacular](https://spoonacular.com/food-api) API, when the game starts it will fetch a random recipe, then grab a random ingredient and present it to the player one.  
  
Player one will write a dish name, the game will search through all the recipes to find the given dish, if it doesnt exist at all it will result in a loss.  
  
If the recipe exists it will check if the given ingredient exists in the given dish. If not it will result in a loss.  
  
If the recipes exists, and the ingredient exists in that dish, the game will again grab a random ingredient from player ones dish and print it out for player two.  

The game will continue as long as both players give correct dishes.  

Longest chain of dishes from the game sets will be saved.  

Users will be able to register/login, change their profiles, delete their profiles. 

## Extra feature
Add possibility to play on two different clients with websockets.
Add dishes from the game to a favorites list.
Get picture of ingredients from a different api.
Add a timer, either give a personal timer or chose from 3 choices.
Add three chances to give a correct answer.