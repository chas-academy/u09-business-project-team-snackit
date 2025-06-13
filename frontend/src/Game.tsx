import BackBtn from "./components/back-btn";
import { useFetchUser } from "./hooks/useFetchUser";
import Versus from "./components/versus";
import GameId from "./components/gameId";
import Gaming from "./components/gaming";


function Game() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("gameId")
    const { user, loadingUser, errorUser} = useFetchUser();
    
    
    if (loadingUser) return <p> Loading...</p>;
    if (errorUser) return <p>Error: {errorUser.message}</p>;
    if (!user) return <p>User not found</p>;
    
    
    return (
        <>
        <header>
            <BackBtn />
        </header>
        <main className="instructions-container">
            <h1 className="title">Welcome {user.name}!</h1>
            <Versus />
            <Gaming />
        </main>
        {gameId && <GameId gameId = {gameId} />}
        </>
    );
}
export default Game;