const API_URL =
  import.meta.env.NODE_ENV === "prod"
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL_LOCAL;
    
type Game = {
    _id: string,
    players: string[],
    currentTurn: string,
    currentIngredient: string,
    lives: object,
    score: number,
    status: string,
    winner: string,
    loser: string
}