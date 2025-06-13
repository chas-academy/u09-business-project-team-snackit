
// type GameIdProps = {
//     gameId: string
// }
function GameId({gameId}: {gameId: string}) {

    return (
        <>
        <footer>
        <p className="game-id">GAME ID: {gameId}</p>
        </footer>
        </>
    )
}
export default GameId;