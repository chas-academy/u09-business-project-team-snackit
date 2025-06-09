import { useEffect, useState } from "react";
import { useFetchGoogleUser } from "./hooks/useFetchGoogleUser";
import ExitBtn from "./components/exit-btn";

function Register() {
  const [selectedImage, setSelectedImage] = useState("img_1.svg");

  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedImage(e.target.value);
  };
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
  //   console.log(selectedImage);

  const googleId = user.id;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3003/users/", {
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
          <p className="breadtext">Enter your credentials, chose a profile pic and you're good to go!</p>
          <div className="chose-pic">
              <img className="img-preview" src={selectedImage} alt="Preview" />
            <form>
              <select name="img1" onChange={handleImageChange}>
                <option value="img_1.svg">Chef Vulpin</option>
                <option value="img_2.svg">Chef Barkley</option>
                <option value="img_3.svg">Chef Gumbo</option>
                <option value="img_4.svg">Chef Prickles</option>
                <option value="img_5.svg">Chef Whiskers</option>
                <option value="img_6.svg">Chef Nibble</option>
              </select>
            </form>
          </div>
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
