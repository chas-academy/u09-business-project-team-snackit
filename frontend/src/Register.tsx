function Register() {

    const registerUser = async () => {
        console.log("hej")
        const res = await fetch ("http://localhost:3003/users", {
            credentials: "include",
            method:"POST",
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json();
        console.log(data)
    }

    return (
        <>
        <div className="register">
            <form className="register-form">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="confirmed_password" placeholder="Confirm password" required/>
                <button onClick={registerUser} id="register-btn" className="start-btn">Register</button>
            </form>
        </div>
        </>
    )
}
export default Register;