import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
  document.getElementById('root-body')?.setAttribute('id', 'login-body');
  const [user, setUser] = useState<any>(null);
  
  const fetchUser = async () => {
    const res = await fetch ("http://localhost:3003/auth/user", {
      credentials: "include"
    });
    
    const data = await res.json();
    setUser(data);
  };
  
  useEffect(() => {
    fetchUser();
  }, []);


  const login = () => {
    window.open("http://localhost:3003/auth/google", "_self");
  };
  
  
  const logout = async () => {
    await fetch ("http://localhost:3003/auth/logout", {
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
                  <Link to={`/lobby?userid=${user.id}`} className="start-btn">START</Link>
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
