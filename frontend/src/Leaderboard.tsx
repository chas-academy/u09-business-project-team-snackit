import { useEffect, useState } from "react";
import BackBtn from "./components/back-btn";

interface Player {
  // föklarar för TS hur datan ska se ut (GER BÄTTRE KONTROLL )
  _id: string;
  name: string;
  wins: number;
  profilePic: string;
}

function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [playerOne, setPlayerOne] = useState("img_1.svg");
  const [playerTwo, setPlayerTwo] = useState("img_1.svg");
  const [playerThree, setPlayerThree] = useState("img_1.svg");

  useEffect(() => {
    const API_URL =
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_API_BASE_URL_PROD
        : import.meta.env.VITE_API_BASE_URL_LOCAL;

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_URL}/api/games/leaderboard`);
        const data = await res.json();
        console.log("Fetched players:", data);
        setPlayerOne(data[0].profilePic);
        setPlayerTwo(data[1].profilePic);
        setPlayerThree(data[2].profilePic);
        setPlayers(data);
        setLoading(false);
        //   setPlayerOne(data[0].profilePic)
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Leaderboard failed: ", err);
        }
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  return (
    <>
      <header>
        <BackBtn />
      </header>
      <main>
        <section className="leaderboard">
          <h1 className="title">Leaderboard</h1>
          <div className="top3-pics">
            <img
              id="second-place"
              className="smaller-pic"
              src={playerTwo}
              alt="players profile pic"
            />
            <img
              id="first-place"
              className="smaller-pic"
              src={playerOne}
              alt="players profile pic"
            />
            <img
              id="third-place"
              className="smaller-pic"
              src={playerThree}
              alt="players profile pic"
            />
          </div>
          <div className="leader-stage">
            <div className="leader-block" id="block-green">
              2
            </div>
            <div className="leader-block" id="block-yellow">
              1
            </div>
            <div className="leader-block" id="block-maroon">
              3
            </div>
          </div>
        </section>
        <section className="leaderboard">
          <p className="total-wins-label">Total wins:</p>
          <article className="leaderboard-table">
            {players.map((player, index) => (
              <div className="player-card" key={player._id}>
                <div className="rank-nr" id={`rank-badge-nr${index + 1}`}>
                  {index + 1}
                </div>

                <p className="player-name">{player.name}</p>
                <p className="player-wins">{player.wins}</p>
              </div>
            ))}
          </article>
        </section>
      </main>
    </>
  );
}
export default Leaderboard;
