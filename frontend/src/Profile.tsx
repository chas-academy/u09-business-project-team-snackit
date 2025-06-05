import { Link } from "react-router-dom";
import BackBtn from "./components/back-btn";
import { useEffect, useState } from "react";
import { useFetchUser } from "./hooks/useFetchUser";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const API_URL =
    import.meta.env.NODE_ENV === "prod"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;

  const { user, loading, error } = useFetchUser();
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!user) return <p>User not found</p>;

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
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      console.log(data);
      window.location.reload();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Update user failed: ", err);
      }
    }
  };
  return (
    <>
      <header>
        <Link to={"/"} className="back-btn" onClick={deleteUser}>
          DELETE
        </Link>
        <BackBtn />
      </header>
      <main>
        <section>
          <h1>Welcome {user.name}!</h1>
          <img
            className="profile-pic"
            src="img_1.svg"
            alt="fox in a chefshat"
          />
        </section>
        <article>
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
            <button>UPDATE</button>
          </form>
        </article>
        <div id="statistics">
          <div>
            <div>
              <div id="left-1"></div>
              <div id="left-2"></div>
              <div id="win"></div>
              <p id="win-title">WINS</p>
            </div>
            <div id="right">
              <div id="right-1"></div>
              <div id="right-2"></div>
              <div id="win-2"></div>
            </div>
          </div>
          <p>{user.wins}</p>
          <p>{user.losses}</p>
        </div>
      </main>
    </>
  );
}
export default Profile;
