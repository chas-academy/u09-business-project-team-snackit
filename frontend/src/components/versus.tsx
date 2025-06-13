import { useFetchUser } from "../hooks/useFetchUser";
import { useFetchGuest } from "../hooks/useFetchGuest";

function Versus() {
  const { user, loadingUser, errorUser } = useFetchUser();
const {guest, loadingGuest, errorGuest} = useFetchGuest();

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
          <div className="hearts">{"❤️".repeat(3)}</div>
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
          <div className="hearts">{"❤️".repeat(3)}</div>
        </div>
      </section>
    </>
  );
}
export default Versus;
