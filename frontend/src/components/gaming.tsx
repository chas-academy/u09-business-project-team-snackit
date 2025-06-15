import { useFetchGame } from "../hooks/useFetchGame";

function Gaming() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("gameId")
    // console.log(gameId)
    const {ongoingGame, loadingOngoingGame, errorOngoingGame} = useFetchGame(gameId!);
    console.log(ongoingGame)
    // if(!game) return <p>Game not found</p>
    // if(loadingGame) return <p>Loading game...</p>
    // if(errorGame) return <p>Error</p>

    // const ingredient: string = game.currentIngredient;
    // console.log(ingredient)
    const opponents_turn = true;
    if (opponents_turn) {
        document.getElementById("playerTwo")?.setAttribute("style", "visibility: hidden;")
    }
    return (
        <>
        <article className="player-turn">
        <p id="playerOne" className="player-name">YOUR TURN</p>
        <p id="playerTwo" className="player-name">YOUR TURN</p>
        </article>
        <section>
            <div className="ingredient-container">
                <h3>INGREDIENT</h3>
                {/* <p>{ingredient.toUpperCase()}</p> */}
            </div>
        </section>
        <div className="submission">
            <input className="input-fields" type="text"  placeholder="Your answer..."/>
            <div className="resultbox"></div>
            <button className="primary-btn">SUBMIT</button>
        </div>
        </>
    )
}
export default Gaming;