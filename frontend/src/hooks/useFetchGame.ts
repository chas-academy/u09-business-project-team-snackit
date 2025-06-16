import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL_LOCAL;

    type Game = {
        _id: string,
        players: string[],
        currentTurn: string,
        currentIngredient: string,
        lives: Record<string, number>,
        score: number,
        status: string,
        winner: string,
        loser: string
    }
export const useFetchGame = (gameId: string) => {
    const [ongoingGame, setOngoingGame] = useState<Game | null>(null)
    const [loadingOngoingGame, setLoadingOngoingGame] = useState(true)
    const [errorOngoingGame, setErrorOngoingGame] = useState<Error | null>(null)

    const fetchGame = async() => {
        try {
            const res = await fetch(`${API_URL}/api/games/${gameId}`, {
                credentials: "include"
            })
            const data = await res.json();
            // console.log(data)
            setOngoingGame(data)
        } catch(err: unknown) {
            if(err instanceof Error) {
                console.error(err)
                setErrorOngoingGame(err)
            }
        } finally {
            setLoadingOngoingGame(false);
        }
    }
    useEffect(() => {
        fetchGame()
    }, [])
    return {ongoingGame, loadingOngoingGame, errorOngoingGame}
}