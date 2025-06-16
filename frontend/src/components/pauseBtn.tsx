import { useState } from "react";
import PauseContainer from "./pauseContainer";

function PauseBtn() {
const [paused, setPaused] = useState(false);

const pauseGame = () => {
    setPaused(prev => !prev)
}
const resumeGame = () => {
    setPaused(false)
}
    console.log(paused)
    return (
        <>
        <button onClick={pauseGame} className="back-btn">BACK</button>
        {paused && <PauseContainer resume={resumeGame} />}
        <div id="pause-container" className="pause-container"></div> 
        </>
    )
}
export default PauseBtn