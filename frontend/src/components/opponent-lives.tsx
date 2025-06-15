import { useFetchGame } from "../hooks/useFetchGame";
import { useFetchGuest } from "../hooks/useFetchGuest";

function OpponentLives({gameId}: {gameId: string}) {
        const {ongoingGame, loadingOngoingGame, errorOngoingGame} = useFetchGame(gameId!);
    
        const playerTwo = ongoingGame?.players[1]
        // console.log(playerTwo)
        const {guest, loadingGuest, errorGuest} = useFetchGuest(playerTwo!);

        if (errorGuest) return <p>Error: {errorGuest.message}</p>;
        if (!guest) return <p>Player Two not found</p>
        if (loadingGuest) return <p> Loading guest...</p>;
    
        if (loadingOngoingGame) return <p>Loading ongoing game...</p>
        if (errorOngoingGame) return <p>Error: {errorOngoingGame.message}</p>
        if (!ongoingGame) return <p>Ongoing game not found</p>

    return (
        <>
          {ongoingGame.lives && guest._id in ongoingGame.lives && (
            
            <div className="hearts">{"❤️".repeat(ongoingGame.lives[guest._id])}</div>
          )}
        </>
    )
}
export default OpponentLives