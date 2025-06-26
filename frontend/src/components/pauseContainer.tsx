import { useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";

type PauseContainerProps = {
    gameId: string;
    resume: () => void;
}

function PauseContainer({gameId, resume}: PauseContainerProps) {
    const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;
    const [message, setMessage] = useState("");
      const { user, loadingUser, errorUser} = useFetchUser();
      if (loadingUser) return <p>Loading...</p>;
      if (errorUser) return <p>Error</p>;
      if(!user) return <p>User not found</p>
    
    console.log(gameId)
    const forfeitGame = async() => {
        try {
            const res = await fetch(`${API_URL}/api/games/${gameId}/forfeit`, {
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({playerId: user._id})
            })
            const data = await res.json();
            setMessage(data.message)
            setTimeout(() => {window.location.href = "/lobby"}, 3000)
        } catch(err: unknown) {
            if(err instanceof Error) {
                console.error(err)
            }
        }
    }
    return(
        <>
            {!message && (
                <>
                <h3 id="pause">PAUSE</h3>
        <div className="pause-container">
                <div>
                <button className="primary-btn" onClick={resume}>RESUME</button>
            <button id="pause-quit" className="primary-btn" onClick={forfeitGame}>QUIT</button>
            </div>
        </div>
                </>
            )}
        {message && <div>{message}</div>}
        
        </>
    )
}
export default PauseContainer