import { useEffect, useState } from "react";
import { useFetchGoogleUser } from "./hooks/useFetchGoogleUser";
import ExitBtn from "./components/exit-btn";
import ProfilePic from "./components/profilePic";

function Register() {
  const BACKEND_URL = import.meta.env.MODE === "production" ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_LOCAL;
  const [selectedImage, setSelectedImage] = useState("img_1.svg");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmed_password: "",
  });
  const { user, loading, error } = useFetchGoogleUser();
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name.givenName || "",
        email: user._json.email || "",
      }));
    }
  }, [user]);
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error</h3>;
  if (!user) return <h3>User not found</h3>;

  const googleId = user.id;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        console.log(selectedImage)
      await fetch(`${BACKEND_URL}/users/`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          googleId: googleId,
          profilePic: selectedImage,
        }),
      });

      window.location.href = `/lobby?userid=${googleId}`;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Registration failed: ", err);
      }
    }
  };

  return (
    <>
      <main>
        <header>
          <ExitBtn />
        </header>
        <section>
          <h1 className="title">Welcome!</h1>
          <p className="breadtext">
            Enter your credentials, chose a profile pic and you're good to go!
          </p>
          <ProfilePic image={setSelectedImage} />
        </section>
        <div className="register">
          <form className="register-form" method="POST" onSubmit={registerUser}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleInput}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleInput}
            />
            <input
              type="password"
              name="confirmed_password"
              placeholder="Confirm password"
              required
              value={formData.confirmed_password}
              onChange={handleInput}
            />
            <button id="register-btn" className="start-btn">
              Register
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
export default Register;
