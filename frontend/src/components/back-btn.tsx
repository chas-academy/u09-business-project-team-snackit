import { Link, useNavigate } from "react-router-dom";

function BackBtn() {
const navigate = useNavigate();

return (
    <>
    <Link className="back-btn" to={'..'}        onClick={(e) => {
        e.preventDefault();
        navigate(-1);
    }}>BACK</Link>
    
    </>
    )
}
export default BackBtn;