import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { loginUser } from "../api/todoApi";
import { useAuth } from "../context/AuthContext";
import type { LoginRequest } from "../types";
import logoImage from "../assets/logo.png";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import {useToast} from "../context/ToastContext.tsx";

const LoginPage = () => {

    const { showToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { user, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/"); // Dashboard
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const credentianals: LoginRequest = {email, password};
            await loginUser(credentianals);
            showToast({ severity: 'success', summary: 'Welcome!', detail: 'You are logged in' });
        } catch {
            showToast({ severity: 'error', summary: 'Login failed', detail: 'Invalid credentials' });
        }

        try {
            const credentials: LoginRequest = { email, password };
            await loginUser(credentials);
            await login();
            navigate("/");
        } catch (err) {
            console.error("LOGIN ERROR:", err);
            setError("Invalid email or password");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <Card
                title="Login"
                style={{ width: "400px", textAlign: "center" }}
            >
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <InputText
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="p-inputtext-lg w-full"
                    />
                    <InputText
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="p-inputtext-lg w-full"
                    />

                    <Button
                        type="submit"
                        label="Login"
                        className="p-button-lg p-button-rounded"
                    />

                    <Button
                        type="submit"
                        label="Register"
                        className="p-button-lg p-button-rounded"
                        onClick={() => navigate("/register")}
                    />

                    {error && <Message severity="error" text={error} />}
                </form>

                <img
                    src={logoImage}
                    alt="Logo"
                    style={{ objectFit: "cover", maxWidth: "100%", marginTop: "30px" }}
                />
            </Card>
        </div>
    );
};

export default LoginPage;