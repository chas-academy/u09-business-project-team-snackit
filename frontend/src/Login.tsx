function Login() {
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;

  document.getElementById("root-body")?.setAttribute("id", "login-body");
  console.log(API_URL)
  const login = () => {
    window.open(`${API_URL}/auth/google`, "_self");
  };

  return (
    <>
      <main>
        <div className="login-container">
          <img
            className="logo"
            src="foodie.logo.png"
            alt="who is the foodie logo"
          />
          <button className="start-btn" onClick={login}>
            Login with Google
          </button>
        </div>
      </main>
    </>
  );
}

export default Login;
