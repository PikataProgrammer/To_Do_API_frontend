import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../types";
import { registerUser } from "../api/todoApi.ts";
import logoImage from "../assets/logo.png";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const data: RegisterRequest = { name, email, password };
            const response = await registerUser(data);
            alert(response.message);
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <Card title="Register" style={{ width: "400px", textAlign: "center" }}>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}
                >
                    <InputText
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="p-inputtext-lg w-full"
                    />
                    <InputText
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-inputtext-lg w-full"
                    />
                    <Password
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        toggleMask
                        feedback={false}
                        required
                        className="p-inputtext-lg w-full"
                        style={{ width: "100%" }}
                    />

                    <Button type="submit" label="Register" className="p-button-lg p-button-rounded p-button-success" />

                    {error && <Message severity="error" text={error} />}
                </form>

                <p style={{ marginTop: "20px" }}>
                    Already have an account? <Link to="/login" style={{ textDecoration: "underline" }}>Login</Link>
                </p>

                <img
                    src={logoImage}
                    alt="Logo"
                    style={{ objectFit: "cover", maxWidth: "100%", marginTop: "20px" }}
                />
            </Card>
        </div>
    );
};

export default RegisterPage;