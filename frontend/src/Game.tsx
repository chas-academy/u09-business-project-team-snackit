import { useFetchUser } from "./hooks/useFetchUser";
import Versus from "./components/versus";
import GameId from "./components/gameId";
import Gaming from "./components/gaming";
import PauseBtn from "./components/pauseBtn";


function Game() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("gameId")
    console.log(gameId)
    const { user, loadingUser, errorUser} = useFetchUser();
    
    
    if (loadingUser) return <p> Loading...</p>;
    if (errorUser) return <p>Error: {errorUser.message}</p>;
    if (!user) return <p>User not found</p>;
    
    
    return (
        <>
        <header>
        {gameId && <PauseBtn gameId = {gameId} />}
        </header>
        <main className="instructions-container">
            <h1 className="title">Welcome {user.name}!</h1>
            {gameId && <Versus gameId = {gameId} />}
            <Gaming />
        </main>
        {gameId && <GameId gameId = {gameId} />}
        </>
    );
}
export default Game;