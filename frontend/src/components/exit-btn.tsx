import { Link, useNavigate } from "react-router-dom";

function ExitBtn() {
  const navigate = useNavigate();
  const API_URL =
    import.meta.env.NODE_ENV === "prod"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;

  const logout = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await fetch(`${API_URL}/auth/logout`, {
      credentials: "include",
    });
    navigate("/")
    window.location.reload();
  };

  return (
    <>
      <Link className="back-btn" to={".."} onClick={logout}>
        {" "}
        EXIT
      </Link>
    </>
  );
}
export default ExitBtn;
