import { useFetchUser } from "../hooks/useFetchUser";
import { useGame } from "../hooks/useGame";

function GameId() {
        const { user } = useFetchUser();
        const playerOne = user?._id;
        const {game} = useGame(playerOne);
        if(!game) return <p>Game not found</p>
    return (
        <>
        <footer>
        <p className="game-id">GAME ID: {game.gameId}</p>
        </footer>
        </>
    )
}
export default GameId;