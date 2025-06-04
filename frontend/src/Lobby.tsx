
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchUser } from "./hooks/useFetchUser";

function Lobby() {

    const { user, loading, error } = useFetchUser();
    if(loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>;
    if(!user ) return <p>User not found</p>

    return(
        <>
       <h1>Welcome {user.name}!</h1>
       <nav>
       <Link to={"/instructions"} id="start-game" className="lobby-btn"><img src="start-btn.svg" alt=""  className="lobby-img"/>START</Link>
       <Link to={"/leaderboard"} id="leaderboard" className="lobby-btn"><img src="iconoir_leaderboard-star.svg" alt="" />LEADERBOARD</Link>
       <Link to={"/profile"} id="profile" className="lobby-btn"><img src="pajamas_profile.svg" alt="" />PROFILE</Link>
       </nav>
        </>
    )
}
export default Lobby;
