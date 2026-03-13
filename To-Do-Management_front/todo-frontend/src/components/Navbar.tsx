
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const items = [
        user
            ? { label: `Hello, ${user.name}!`, icon: "pi pi-user", items: [{ label: "Logout", icon: "pi pi-sign-out", command: handleLogout }] }
            : { label: "Account", icon: "pi pi-user", items: [{ label: "Login", icon: "pi pi-sign-in",
                    command: () => navigate("/login") }, { label: "Register", icon: "pi pi-user-plus",
                    command: () => navigate("/register") }] }
    ];

    return <Menubar model={items} />;
};

export default Navbar;