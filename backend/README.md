# Backend Documentation
### Tools used
+ Database: MongoDB
+ Express.js
+ Node.js

## Getting started
+ ```cd backend```
+ ```npm install```
+ ```npm run build```
+ ```cp .env.example .env```
+ Create an account on at [Spoonacular](https://spoonacular.com/food-api/docs)

## Links
[Endpoints](backend\design.md)  
[ER diagram](https://drawsql.app/teams/hej-8/diagrams/who-is-the-foodie)  

## API
We used an external API for our project, [Spoonacular](https://spoonacular.com/food-api/docs)

With that we created a game. It starts by fetching a random recipe from the Spoonacular API, it will then fetch a random ingredient from the randomly chose recipe. Player one will have to submit and answer, a new recipe which includes the given ingredient.  

Backend will check the Spoonacular API for the submitted recipe, if the recipe does not exist the player will lose the game, if the recipe exists it will fetch a random ingredient from the recipe given in the submitted answer.  

This will continue until a player forfeits the game, or a player loses a game. The win will be registered on the winning user, in the database. The loss with be registered on the losing user, in the database.

The leaderboard fetches all users and displays them in ascending order.  

## Script for Insomnia
If you want to try out our game endpoints, you can download this script and use it with insomnia.
[Insomnia script](./Insomnia_2025-06-10.yaml)