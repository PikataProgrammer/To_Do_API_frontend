import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import type {RegisterRequest} from "../types";
import {registerUser} from "../api/todoApi.ts";
import logoImage from "../assets/logo.png";


const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isHovered, setHovered] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');

        try {
            const data: RegisterRequest = {name, email, password};
            const response = await registerUser(data);
            alert(response.message);

            navigate("/login");
        }
        catch (error: any) {
            setError(error.response?.data?.message || "Registration failed.");
        }
    };
    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h1 style={{letterSpacing: "34px", alignItems: "center", textAlign: "center", margin: "0px 100px 40px 0px" }}>REGISTER</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input style={{borderRadius: "5px", padding: "5px 5px"}} type="text" placeholder="Name" value={name}
                       onChange={(e) => setName(e.target.value)} required />
                <input style={{borderRadius: "5px", padding: "5px 5px"}} type="text" placeholder="Email" value={email}
                       onChange={(e) => setEmail(e.target.value)} required />
                <input style={{borderRadius: "5px", padding: "5px 5px"}} type="password" placeholder="Password" value={password}
                       onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)} style={{color: "black", textDecoration: "none", borderRadius:
                        "10px", padding: "10px 10px", cursor: "pointer", border: "1px solid black", backgroundColor: isHovered ? "#b5ffb8" : "#e80712"}}>Register</button>
            </form>

            {error && <p style={{color: "red"}}>{error}</p>}

            <p>
                Already have an account? <Link to="/login" style={{textDecoration: "underline"}}>Login</Link>
            </p>
            <img src={logoImage} alt="Logo" style={{objectFit: "cover", maxWidth: "100%"}} />
        </div>
    )
}

export default RegisterPage;