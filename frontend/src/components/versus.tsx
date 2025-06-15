import { useFetchUser } from "../hooks/useFetchUser";
import { useFetchGuest } from "../hooks/useFetchGuest";
import { useFetchGame } from "../hooks/useStartGame";

function Versus({gameId}: {gameId: string}) {
const { user, loadingUser, errorUser } = useFetchUser();
const {game, loadingGame, errorGame} = useFetchGame(gameId!);

const playerTwo = game?.players[1]
const {guest, loadingGuest, errorGuest} = useFetchGuest(playerTwo!);

if (loadingUser) return <p> Loading...</p>;
if (errorUser) return <p>Error: {errorUser.message}</p>;
if (!user) return <p>User not found</p>;

if (errorGuest) return <p>Error: {errorGuest.message}</p>;
if (!guest) return <p>Player Two not found</p>
if (loadingGuest) return <p> Loading...</p>;

console.log(game)
if(!game) return <p>Game not found</p>
if(loadingGame) return <p>Loading game...</p>
if(errorGame) return <p>Error</p>

const ingredient: string = game.currentIngredient;
console.log(ingredient)
console.log(game.lives[guest._id])



  return (
    <>
      <section className="versus">
        <div className="player">
          <p className="player-name">{user.name}</p>
          <img
            className="smaller-pic"
            src={user.profilePic}
            alt="player profile pic"
          />
          {game.lives && user._id in game.lives && (
            
            <div className="hearts">{"❤️".repeat(game.lives[user._id])}</div>
          )}
        </div>

        <div className="vs-icon">
          <img id="vsImg" src="vs.svg" alt="red pepper vs garlic" />
        </div>

        <div className="player">
          <p className="player-name">{guest.name}</p>
          <img
            className="smaller-pic"
            src={guest.profilePic}
            alt="opponent profile pic"
          />
          <div className="hearts">{"❤️".repeat(game.lives[guest._id])}</div>
        </div>
      </section>
    </>
  );
}
export default Versus;
