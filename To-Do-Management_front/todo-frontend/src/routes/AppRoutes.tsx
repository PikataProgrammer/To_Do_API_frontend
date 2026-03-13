import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import {AuthContextProvider} from "../context/AuthContext";
import RegisterPage from "../pages/RegisterPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Navbar from "../components/Navbar.tsx";

export const AppRoutes = () => {

    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Dashboard />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

        </AuthContextProvider>
    );
};
