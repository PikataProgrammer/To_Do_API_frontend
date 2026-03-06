import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import {AuthContextProvider} from "../context/AuthContext";
import RegisterPage from "../pages/RegisterPage.tsx";
import Navbar from "../components/Navbar.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

export const AppRoutes = () => {

    return (
        <AuthContextProvider>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

        </AuthContextProvider>
    );
};
