import { useEffect, useState } from "react"
import BackBtn from "./components/back-btn";

interface Player {   // föklarar för TS hur datan ska se ut (GER BÄTTRE KONTROLL )
    _id: string,
    name: string,
    wins: number;
}

function Leaderboard() {

    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const API_URL =
        import.meta.env.NODE_ENV === "prod"
          ? import.meta.env.VITE_API_BASE_URL_PROD
          : import.meta.env.VITE_API_BASE_URL_LOCAL;
          
        const fetchLeaderboard = async () => {
            try{
                const res = await fetch(`${API_URL}/api/v1/games/leaderboard`);
                const data = await res.json();
                console.log("Fetched players:", data);
                setPlayers(data);
                setLoading(false);
            } catch(err: unknown) {
                if(err instanceof Error) {
                    console.error("Leaderboard failed: ", err)
                }
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    if (loading) return <p>Loading leaderboard...</p>

    return(
        <>
        <header>
            <BackBtn />
        </header>
        <main className="leaderboard">
            <div className="leaderboard-header">
                <h1>Leaderboard</h1>
                <span className="total-wins-label">Total wins:</span>
            </div>

            <table className="leaderboard-table">
                <tbody>
                    {players.map((player, index) => (  //loopar igenom varje elemnt i listan
                        <tr key={player._id}>    {/* identifierrar varje element i en lista */}
                        <td className="rank-number">
                            <div className={`rank-badge rank-${index + 1}`}>{index + 1}</div> {/* räknar ut var själva placeringen ska vara.  */}
                        </td>
                        <td className="player-name">{player.name}</td>
                        <td className="player-wins">
                            <div className="wins-badge">{player.wins}</div>
                        </td>
                        </tr>
                ))}
                </tbody>
            </table>
        </main>
        </>

    );
}
export default Leaderboard;