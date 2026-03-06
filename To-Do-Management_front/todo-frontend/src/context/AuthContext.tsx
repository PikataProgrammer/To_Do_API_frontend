import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode
} from "react";

import type { User } from "../types";
import { api } from "../api/todoApi";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshUser().finally(() => setLoading(false));
    }, []);

    const refreshUser = async () => {
        try {
            const response = await api.get("/users/me");
            setUser(response.data);
        } catch (error: any) {
            if (error.response?.status !== 401) {
                console.error(error);
            }
            setUser(null);
        }
    };

    const login = async () => {
        await refreshUser();
    };

    const logout = async () => {
        await api.post("/users/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, logout, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within AuthProvider");
    return context;
};