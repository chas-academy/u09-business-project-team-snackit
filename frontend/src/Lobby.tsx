import { Link } from "react-router-dom";
import { useFetchUser } from "./hooks/useFetchUser";
import Register from "./Register";
import ExitBtn from "./components/exit-btn";

function Lobby() {
  const { user, loading, error } = useFetchUser();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(user);
  if (user === null) {
    return (
      <>
        <Register />
      </>
    );
  }
  if (user) {
    return (
      <>
          <header id="exit-btn">
            <ExitBtn />
          </header>
        <main>
          <section className="lobby">
          <h1 className="title">Welcome {user!.name}!</h1>
          <img
            className="profile-pic"
            src="img_1.svg"
            alt="fox in a chefshat"
          />
          <nav>
            <Link to={"/instructions"} id="start-game" className="lobby-btn">
              <img
                src="start-btn.svg"
                alt="gaming controller"
                className="lobby-img"
              />
              START
            </Link>
            <Link to={"/leaderboard"} id="leaderboard" className="lobby-btn">
              <img
                src="iconoir_leaderboard-star.svg"
                alt="three step leaderplateau"
                className="lobby-img"
              />
              LEADERBOARD
            </Link>
            <Link to={"/profile"} id="profile" className="lobby-btn">
              <img
                src="pajamas_profile.svg"
                alt="silhoutte of personshead"
                className="lobby-img"
              />
              PROFILE
            </Link>
          </nav>
          </section>
        </main>
      </>
    );
  }
}
export default Lobby;
