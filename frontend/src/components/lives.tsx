import { useFetchGame } from "../hooks/useFetchGame";
import { useFetchUser } from "../hooks/useFetchUser";

function Lives({gameId}: {gameId: string}) {
    const { user, loadingUser, errorUser } = useFetchUser();
    const {ongoingGame, loadingOngoingGame, errorOngoingGame} = useFetchGame(gameId!);


    if (loadingUser) return <p> Loading user...</p>;
    if (errorUser) return <p>Error: {errorUser.message}</p>;
    if (!user) return <p>User not found</p>;


    if (loadingOngoingGame) return <p>Loading ongoing game...</p>
    if (errorOngoingGame) return <p>Error: {errorOngoingGame.message}</p>
    if (!ongoingGame) return <p>Ongoing game not found</p>

    return (
        <>
          {ongoingGame.lives && user._id in ongoingGame.lives && (
            
            <div className="hearts">{"❤️".repeat(ongoingGame.lives[user._id])}</div>
          )}
        </>
    )
}
export default Lives