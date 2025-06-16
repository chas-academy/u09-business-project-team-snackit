import { Link } from "react-router-dom";
import BackBtn from "./components/back-btn";
import { useEffect, useState } from "react";
import { useFetchUser } from "./hooks/useFetchUser";
import ProfilePic from "./components/profilePic";

function Profile() {
  const [selectedImage, setSelectedImage] = useState("")
  const [showEditPic, setShowEditPic] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;

  const { user, loadingUser, errorUser } = useFetchUser();
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
      setSelectedImage(user.profilePic);
    }
  }, [user]);
  if (loadingUser) return <h3>Loading...</h3>;
  if (errorUser) return <h3>Error</h3>;
  if (!user) return <h3>User not found</h3>;
  // console.log(user)
  const deleteUser = async () => {
    try {
      await fetch(`${API_URL}/users/${user._id}`, {
        credentials: "include",
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      await fetch(`${API_URL}/auth/logout`, {
        credentials: "include",
      });
      window.location.href = "/";
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Failed to delete: ", err);
        return;
      }
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/users/${user._id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, profilePic: selectedImage }),
      });
      const data = await res.json();
      console.log(data);
      setShowEditPic(false)
      window.location.reload();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Update user failed: ", err);
      }
    }
  };
  const editPic = () => {
    setShowEditPic(true)
    
  }
  return (
    <>
      <header id="profile-header">
        <Link
          to={"/"}
          className="back-btn"
          onClick={deleteUser}
          id="delete-account"
        >
          DELETE ACCOUNT
        </Link>
        <BackBtn />
      </header>
      <main>
        <section>
          <h1 className="title">Welcome {user.name}!</h1>
          {!showEditPic && <>
          <img
            className="profile-pic"
            src={user.profilePic}
            alt="fox in a chefshat"
            />
            <button id="edit-profile-pic" onClick={editPic}><img src="edit.svg" alt="pencil" /></button>
          </>
          }
          { showEditPic && <ProfilePic image={setSelectedImage}/>}
          <form className="update-form" onSubmit={updateUser}>
            <input
              type="text"
              name="name"
              placeholder="Name: "
              value={formData.name}
              onChange={handleInput}
            />
            <input
              type="text"
              name="email"
              placeholder="Email: "
              value={formData.email}
              onChange={handleInput}
            />
            <button className="primary-btn">UPDATE</button>
          </form>
          <article id="stats">
            <h2>Statistics</h2>
            <div className="stats-container">
            <div className="stats-box">
              <img src="trophy.svg" alt="trophy"  className="stats-trophy"/>
              <img src="win-label.svg" alt="yellow label with text wins"  className="stats-label"/>
              <h3>{user.wins}</h3>
            </div>
            <div className="stats-box">
              <img src="loss.svg" alt="theater sad mask" className="stats-trophy"/>
              <img src="loss-label.svg" alt="red label with text losses" className="stats-label"/>
              <h3>{user.losses}</h3>
            </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
export default Profile;
