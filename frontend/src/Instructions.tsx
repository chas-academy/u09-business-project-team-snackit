import { useFetchUser } from "./hooks/useFetchUser";
import Versus from "./components/versus";
import { Link } from "react-router-dom";
import GameId from "./components/gameId";
import { useCreateGame } from "./hooks/useCreateGame";
import PauseBtn from "./components/pauseBtn";

function Instructions() {
    const { user, loadingUser, errorUser} = useFetchUser();
    const playerOne = user?._id;
    const {newGame, loadingNewGame, errorNewGame} = useCreateGame(playerOne!);


    if (loadingUser || loadingNewGame) return <p> Loading...</p>;
    if (errorUser) return <p>Error with user: {errorUser.message}</p>;
    if (errorNewGame) return <p>Error with game: {errorNewGame.message}</p>
    if (!user) return <p>User not found</p>;
    if(!newGame) return <p>No game found</p>


    return (
        <>
        <header>
            <PauseBtn />
        </header>
        <main className="instructions-container">
            <h1 className="title">Welcome {user.name}!</h1>
            {newGame && <Versus gameId = {newGame.gameId} />}
            <section className="instruction-text">
                    <h3>HOW TO PLAY:</h3>
                    <p>Enter a recipe that uses the given ingredient.
                    If the recipe does not exist, or the ingredient is not included in the submitted recipe you lose!
                    Ready to find out who is the foodie?</p>
                </section>
                <Link to={`/game?gameId=${newGame.gameId}`} className="primary-btn">START</Link>
        </main>
        {newGame && <GameId gameId = {newGame.gameId} />}
        </>
    );
}

export default Instructions;