import { useEffect, useState } from "react";

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
export const useFetchGame = (gameId: string) => {
    const [game, setGame] = useState<Game | null>(null);
    const [loadingGame, setLoadingGame] = useState(true);
    const [errorGame, setErrorGame] = useState<Error | null>(null)

    const fetchGameStart = async() => {
        try {
            const res = await fetch(`${API_URL}/api/games/start/${gameId}`, {
                credentials: "include",
                method: "POST"
            })
            if(!res.ok) throw new Error("Failed to start game");
            const data = await res.json();
            console.log(data)
            setGame(data);
        } catch(err: unknown) {
            if(err instanceof Error) {
                console.error(err)
                setErrorGame(err)
            }
        } finally {
            setLoadingGame(false);
        }
    }
    useEffect(() => {
        fetchGameStart()
    }, [])
    return {game, loadingGame, errorGame}
}