import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
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
    document.getElementById('root-body')?.setAttribute('id', 'login-body');
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

  return (
    <>
      <main>
        <div className="login-container">
          <img
            className="logo"
            src="foodie.logo.png"
            alt="who is the foodie logo"
          />
          <Link to={'/lobby'} className="start-btn">START</Link>
            {user ? (
              <div>
                  <p>Welcome, {user.displayName}</p>
                  <img src={user.photos[0].value} alt="profile picture" width="100"/>
                  <br />
                  <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <button onClick={login}>
               Login with Google</button> )}
          {/* <GoogleLogin
          onSuccess={() => {
          }}
          onError={()=>{
            console.log("Login failed")
          }}/> */}
        </div>
      </main>
    </>
  );
}

export default Login;
