import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import socket from "./socket";
import "./_instructions.scss";

// Definerar vilken typ av spelare vi ska ha. Kopplad till backends userModel
// alltså den skapar en typdefinition i Typescript för hur ett Player-objekt ska se ut i frontend.
type Player = {
  id: string;
  name: string;
  avatarUrl?: string;
  lives?: number;
};


function Instructions() {
    const navigate = useNavigate();

    const [players, setPlayers] = useState<Player[]>([]);
    const [gameId, setGameId] = useState<string>("");
    const [userId, setUserId] = useState<string>("");

    //hämtar inloggad anv från vår backend
    useEffect(() => {
        fetch("http://localhost:3003/auth/user", {credentials: "include"})
        .then((res) => res.json())
        .then((data) => {setUserId(data.id);
        });
    }, []);



    //Hämtar spelare genom websocket
    useEffect(()=>{
        socket.emit("joingame");

        socket.on("gameReady", (data: {players: Player[]; gameId: string}) => {
            setPlayers(data.players);
            setGameId(data.gameId);
        });
        return () => {
            socket.off("gameReady");
        };
    }, []); 

        // Hittar mig och min motståndare 
        const currentUser = players.find((p) => p.id ===userId);
        const opponent = players.find((p) => p.id !==userId);

        const handleStart= () => {
            socket.emit("startGame", {gameId});
            navigate("/game");
        };

    return (
        <main className="instructions-container">
            <h1>Welcome {currentUser?.name || "Player"}!</h1>

            <section className="players">
                {opponent && (
                    <div className="player">
                        <p>{opponent.name}</p>
                        <img src="" alt="" />
                         <div className="hearts">{"❤️".repeat(3)}</div>  {/* hårdkodade liv som måste läggas till i backend modells sen när man har tid men det är inte prio */}
                    </div>
                )}

                <div className="vs-icon">
                    <p>VS</p>   {/*  lägg in "vs" bilden som ida gjort HÄR */}
                    <img src="" alt="" />
                </div>

                {currentUser && (
                    <div className="player">
                        <p>{currentUser.name}</p>
                        <img src="" alt="" />
                        <div className="hearts">{"❤️".repeat(3)}</div>  {/* hårdkodade liv som måste läggas till i backend modells sen när man har tid men det är inte prio */}
                    </div>
                )}
            </section>

            <section className="instruction-text">
                <p><strong>HOW TO PLAY:</strong></p>
                <p>Enter a recipe that uses the given ingredient.</p>
                <p>If the recipe does not exist, or the ingredient is not included in the submitted recipe you lose!</p>
                <p>Ready to find out who is the foodie?</p>
            </section>
            
            <button className="start-btn" onClick={handleStart}>START</button>
            <button className="back-btn" onClick={() => navigate("/lobby")}>BACK</button>

            <p className="game-id">GAME ID:{gameId}</p>
        </main>
    );
}
export default Instructions;