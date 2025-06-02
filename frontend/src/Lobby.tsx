import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Lobby() {

    return(
        <>
       <h1>Welcome username!</h1>
       <nav>
       <Link to={"/game"} id="start-game" className="lobby-btn"><img src="start-btn.svg" alt=""  className="lobby-img"/>START</Link>
       <Link to={"/leaderboard"} id="leaderboard" className="lobby-btn"><img src="iconoir_leaderboard-star.svg" alt="" />LEADERBOARD</Link>
       <Link to={"/profile"} id="profile" className="lobby-btn"><img src="pajamas_profile.svg" alt="" />PROFILE</Link>
       </nav>
        </>
    )
}
export default Lobby;
