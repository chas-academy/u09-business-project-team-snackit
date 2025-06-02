import { useState } from "react";
import { redirect } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmed_password: ""
    })
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{ name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
        try{
            const res = await fetch ("http://localhost:3003/users/", {
                credentials: "include",
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            console.log(data)
            return redirect("/lobby")

        } catch(err: unknown) {
            if(err instanceof Error) {
                console.error("Registration failed: ", err)
            }
        }
    }

    return (
        <>
        <div className="register">
            <form className="register-form" method="POST" onSubmit={registerUser}>
                <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleInput}/>
                <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleInput}/>
                <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleInput}/>
                <input type="password" name="confirmed_password" placeholder="Confirm password" required value={formData.confirmed_password} onChange={handleInput}/>
                <button id="register-btn" className="start-btn">Register</button>
            </form>
        </div>
        </>
    )
}
export default Register;