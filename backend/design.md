# API design

## Endpoints
  
/lobby              Game lobby  
  
/login              Login page  
/register           Register page
  
/leaderboard        GET all in ascending
  
/users              POST one (create)  
/users              GET all  
/users/:userId      GET one  
/users/:userId      PUT one  
/users/:userId      DELETE one  
  
/game               POST one (create)
/:gameId            Get one
/games              GET all  

/Start/:gameId/                         GET play game       startgame()  
/:gameId/submit                         PUT check           checkSubmission()  
/:gameId/next                           GET next turn       nextIngredient()
/:gameId/forfeit                        PUT end game        forfeitGame()

## Examples
/users              GET all
```
{
    users: [
        {
            "name": "Ida",
            "email": "ida@test.com",
            "password": "jiadjdw",
            "wins": 2
        },
        {
            "name": "Pedro",
            "email": "pedro@test.com",
            "password": "jiadjdw",
            "wins": 4
        }
    ]
}
```  
  
/leaderboard        GET all in ascending  
```
{
    users: [
        {
            "name": "Pedro",
            "wins": 4
        },
        {
            "name": "Ida",
            "wins": 2
        }
    ]
}