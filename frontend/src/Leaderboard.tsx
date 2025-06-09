import { useEffect, useState } from "react";
import BackBtn from "./components/back-btn";

interface Player {
  // föklarar för TS hur datan ska se ut (GER BÄTTRE KONTROLL )
  _id: string;
  name: string;
  wins: number;
}

function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL =
      import.meta.env.NODE_ENV === "prod"
        ? import.meta.env.VITE_API_BASE_URL_PROD
        : import.meta.env.VITE_API_BASE_URL_LOCAL;

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/games/leaderboard`);
        const data = await res.json();
        console.log("Fetched players:", data);
        setPlayers(data);
        setLoading(false);
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
              className="leader-pic"
              src="img_1.svg"
              alt="fox in a chefs hat"
            />
            <img
              className="leader-pic"
              src="img_2.svg"
              alt="dog in a chefs hat"
            />
            <img
              className="leader-pic"
              src="img_3.svg"
              alt="koala in a chefs hat"
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
            {players.map(
              (
                player,
                index //loopar igenom varje elemnt i listan
              ) => (
                <>
                  <div className="player-card" key={player._id}>
                    {/* identifierrar varje element i en lista */}
                    <div className="rank-nr" id={`rank-badge-nr${index + 1}`}>
                      {index + 1}
                    </div>
                    {/* räknar ut var själva placeringen ska vara.  */}
                    <p className="player-name">{player.name}</p>
                    <p className="player-wins">{player.wins}</p>
                  </div>
                </>
              )
            )}
          </article>
        </section>
      </main>
    </>
  );
}
export default Leaderboard;
