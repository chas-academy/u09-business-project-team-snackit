import BackBtn from "./components/back-btn";
import { useFetchUser } from "./hooks/useFetchUser";
import Versus from "./components/versus";
import GameId from "./components/gameId";
import Gaming from "./components/gaming";


function Game() {
    const { user, loading, error} = useFetchUser();


    if (loading) return <p> Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
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
        <GameId />
        </>
    );
}
export default Game;