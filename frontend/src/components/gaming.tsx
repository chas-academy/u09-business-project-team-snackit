import { useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import { useFetchGameStart } from "../hooks/useStartGame";

function Gaming() {
    const API_URL =
  import.meta.env.NODE_ENV === "prod"
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL_LOCAL;

    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("gameId")
    // console.log(gameId)
    const [results, setResults] = useState<string[]>([]);
    const { user, loadingUser, errorUser } = useFetchUser();
    const {game, loadingGame, errorGame} = useFetchGameStart(gameId!);
    const [formData, setFormData] = useState({
        submission: ""
      });

    if (loadingUser) return <p> Loading user...</p>;
    if (errorUser) return <p>Error: {errorUser.message}</p>;
    if (!user) return <p>User not found</p>;

    console.log(game)
    if(!game) return <p>Game not found</p>
    if(loadingGame) return <p>Loading game...</p>
    if(errorGame) return <p>Error</p>

    const ingredient: string = game.currentIngredient;
    console.log(game.currentTurn)
    if (game.currentTurn == user._id) {
        document.getElementById("playerTwo")?.setAttribute("style", "visibility: hidden;")
    } else {
        document.getElementById("playerOne")?.setAttribute("style", "visibility: hidden")
    }

    const showResults = async() => {
        const resultBox = document.getElementById("resultbox")
        if(!resultBox) return;
        console.log(formData.submission)
        const res = await fetch(`${API_URL}/search`, {
            credentials: "include",
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({input: formData.submission})
        })
        const data = await res.json();
        setResults(data.Titles);
    }
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, submission: e.target.value });
      };
    return (
        <>
        <article className="player-turn">
        <p id="playerOne" className="player-name">YOUR TURN</p>
        <p id="playerTwo" className="player-name">YOUR TURN</p>
        </article>
        <section>
            <div className="ingredient-container">
                <h3>INGREDIENT</h3>
                <p>{ingredient.toUpperCase()}</p>
            </div>
        </section>
        <form id="submission-form" className="submission" onKeyUp={showResults} >
            <input className="input-fields" type="text"  value={formData.submission} onChange={handleInput} placeholder="Your answer..."/>
            <button className="primary-btn">SUBMIT</button>
        </form>
            <div id="resultbox" className="resultbox">
            {results.map((r, i) => (
      <p key={i}>{r}</p>
    ))}
            </div>
        </>
    )
}
export default Gaming;