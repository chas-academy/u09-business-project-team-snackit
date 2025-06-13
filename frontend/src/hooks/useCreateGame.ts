import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.NODE_ENV === "prod"
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL_LOCAL;

type Game = {
    gameId: string,
}

export const useCreateGame = (playerOne: string) => {
    const [game, setGame] = useState<Game | null>(null);
    const [loadingGame, setLoadingGame] = useState(true);
    const [errorGame, setErrorGame] = useState<Error | null>(null);

    useEffect(() => {
        const fetchGame = async() => {
            try{
                const res = await fetch(`${API_URL}/api/games`, {
                    credentials: "include",
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({
                        player1: playerOne,
                        player2: "683d9a05a9cbce37c219c55b"})
                });
                if(!res.ok) throw new Error("Failed to create game");
                const data = await res.json();
                console.log(data)
                setGame(data);
            } catch(err: unknown) {
                if(err instanceof Error) {
                    console.error(err);
                    setErrorGame(err)
                }
            } finally {
                setLoadingGame(false);
            }
        }
        if(playerOne){
            fetchGame();
        }
    }, [playerOne])
        return {game, loadingGame, errorGame};
    }
