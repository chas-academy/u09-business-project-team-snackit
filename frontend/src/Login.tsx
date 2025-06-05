import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
  const API_URL =
    import.meta.env.NODE_ENV === "prod"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;
      
  document.getElementById('root-body')?.setAttribute('id', 'login-body');
  const [user, setUser] = useState<any>(null);
  
  const fetchUser = async () => {
    const res = await fetch (`${API_URL}/auth/user`, {
      credentials: "include"
    });
    
    const data = await res.json();
    setUser(data);
  };
  
  useEffect(() => {
    fetchUser();
  }, []);


  const login = () => {
    window.open(`${API_URL}/auth/google`, "_self");
  };
  
  
  const logout = async () => {
    await fetch (`${API_URL}/auth/logout`, {
      credentials: "include"
    });
    setUser(null);
  };
  // console.log(user.id)
  return (
    <>
      <main>
        <div className="login-container">
          <img
            className="logo"
            src="foodie.logo.png"
            alt="who is the foodie logo"
          />
            {user ? (
              <div>
                {/* kolla mot databas- finns personen? finns inte - register form. finns - lobby */}
                  <Link to={`/lobby`} className="start-btn">START</Link>
                  <p>Welcome, {user.displayName}</p>
                  {/* <img src={user.photos[0].value} alt="profile picture" width="100"/> */}
                  <br />
                  <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <button className="start-btn" onClick={login}>
               Login with Google</button> )}

        </div>
      </main>
    </>
  );
}

export default Login;
