import { Link } from "react-router-dom"

function PauseContainer({resume}: {resume: () => void}) {
    return(
        <>
        <div className="pause-container">
            <button onClick={resume}>RESUME</button>
            <Link className="back-btn" to={"/lobby"}>QUIT</Link>
        </div>
        </>
    )
}
export default PauseContainer