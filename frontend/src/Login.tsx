import { Link } from "react-router-dom";

function Login() {
  document.getElementById('root-body')?.setAttribute('id', 'login-body');
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
        </div>
      </main>
    </>
  );
}
export default Login;
