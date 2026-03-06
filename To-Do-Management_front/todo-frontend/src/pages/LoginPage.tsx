import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../api/todoApi";
import { useAuth } from "../context/AuthContext";
import type {LoginRequest} from "../types";
import logoImage from "../assets/logo.png"

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [isHoveredLogin, setHoveredLogin] = useState(false);


    useEffect(() => {
        if (user) {
            navigate("/"); // Dashboard
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const credentials: LoginRequest = { email, password };
            await loginUser(credentials);

            await login();

            navigate("/");

        } catch (err) {
            console.error("LOGIN ERROR:", err);
            setError("Invalid credentials");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h1 style={{letterSpacing: "40px", alignItems: "center", textAlign: "center", margin: "0px 0px 20px 40px" }}>LOGIN</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input style={{borderRadius: "5px", padding: "5px 5px"}}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input style={{borderRadius: "5px", padding: "5px 5px"}}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit" onMouseEnter={() => setHoveredLogin(true)}
                        onMouseLeave={() => setHoveredLogin(false)} style={{color: "black", textDecoration: "none", borderRadius:
                        "10px", padding: "10px 10px", cursor: "pointer", border: "1px solid black", backgroundColor: isHoveredLogin ? "#b5ffb8" : "#e80712"}}>Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
            <img src={logoImage} alt="Logo" style={{objectFit: "cover", maxWidth: "100%", marginTop: "40px"}} />
        </div>
    );
};

export default LoginPage;
