import { useFetchUser } from "../hooks/useFetchUser";

function Versus() {
    const { user, loading, error} = useFetchUser();


    if (loading) return <p> Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!user) return <p>User not found</p>;
    console.log(user)
    const guest = {
        name: "Guest",
        profilePic: "img_1.svg",
        lives: 3, 
    };

    return (
        <>
        
        <section className="versus"> 
                <div className="player">
                    <p className="player-name">{user.name}</p>
                    <img className="smaller-pic" src={user.profilePic} alt="player profile pic" />
                    <div className="hearts">{"❤️".repeat(3)}</div>
                </div>
               
        
                <div className="vs-icon">
                    {/* <p>VS</p>    lägg in "vs" bilden som ida gjort HÄR */}
                        <img id="vsImg" src="vs.svg" alt="red pepper vs garlic" />
                </div>

                <div className="player">
                    <p className="player-name">{guest.name}</p>
                    <img className="smaller-pic" src={guest.profilePic} alt="opponent profile pic" />
                    <div className="hearts">{"❤️".repeat(guest.lives)}</div>
                </div>
            </section>
        </>
    )
}
export default Versus;