import { useFetchUser } from "../hooks/useFetchUser";
import { useFetchGuest } from "../hooks/useFetchGuest";
import Lives from "./lives";
import OpponentLives from "./opponent-lives";

function Versus({gameId}: {gameId: string}) {
const playerTwoId = "683d9a05a9cbce37c219c55b";

const { user, loadingUser, errorUser } = useFetchUser();
const {guest, loadingGuest, errorGuest} = useFetchGuest(playerTwoId);

  if (loadingUser || loadingGuest) return <p> Loading...</p>;
  if (errorUser) return <p>Error: {errorUser.message}</p>;
  if (errorGuest) return <p>Error: {errorGuest.message}</p>;
  if (!user) return <p>User not found</p>;
  if (!guest) return <p>Player Two not found</p>

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
          <Lives  gameId = {gameId} />
            {/* <div className="hearts">{"❤️".repeat(3)}</div> */}
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
          <OpponentLives gameId ={gameId} />
          {/* <div className="hearts">{"❤️".repeat(3)}</div> */}
        </div>
      </section>
    </>
  );
}
export default Versus;
