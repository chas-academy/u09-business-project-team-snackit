import { Link } from "react-router-dom";
import { useFetchUser } from "./hooks/useFetchUser";
import Register from "./Register";
import ExitBtn from "./components/exit-btn";

function Lobby() {
    const { user, loading, error} = useFetchUser();
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>
    console.log(user)
    if(user === null) {
        return (
        <>
        <Register />
        </>
        )
    }
    if(user) {
        return (
        <>
        <header id="exit-btn"><ExitBtn /></header>
        <h1>Welcome {user!.name}!</h1>
       <nav>
       <Link to={"/game"} id="start-game" className="lobby-btn"><img src="start-btn.svg" alt=""  className="lobby-img"/>START</Link>
       <Link to={"/leaderboard"} id="leaderboard" className="lobby-btn"><img src="iconoir_leaderboard-star.svg" alt="" className="lobby-img"/>LEADERBOARD</Link>
       <Link to={"/profile"} id="profile" className="lobby-btn"><img src="pajamas_profile.svg" alt="" className="lobby-img"/>PROFILE</Link>
       </nav>
        </>
        )
    }
    // return(
    //     <>
    //    <h1>Welcome username!</h1>
    //    <nav>
    //    <Link to={"/game"} id="start-game" className="lobby-btn"><img src="start-btn.svg" alt=""  className="lobby-img"/>START</Link>
    //    <Link to={"/leaderboard"} id="leaderboard" className="lobby-btn"><img src="iconoir_leaderboard-star.svg" alt="" className="lobby-img"/>LEADERBOARD</Link>
    //    <Link to={"/profile"} id="profile" className="lobby-btn"><img src="pajamas_profile.svg" alt="" className="lobby-img"/>PROFILE</Link>
    //    </nav>
    //     </>
    // )
}
export default Lobby;
