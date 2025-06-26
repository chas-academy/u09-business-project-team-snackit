import { useState } from "react";
import PauseContainer from "./pauseContainer";


function PauseBtn({gameId}: {gameId: string}) {
const [paused, setPaused] = useState(false);

const pauseGame = () => {
    setPaused(prev => !prev)
}
const resumeGame = () => {
    setPaused(false)
}
    return (
        <>
        <button onClick={pauseGame} className="back-btn">BACK</button>
        {paused && <PauseContainer resume={resumeGame} gameId={gameId}  />}
        </>
    )
}
export default PauseBtn