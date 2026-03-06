import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {useState} from "react";


const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isHoveredLogin, setIsHoveredLogin] = useState(false);
    const [isHoveredRegister, setIsHoveredRegister] = useState(false);
    const [isHoveredLogout, setIsHoveredLogout] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    return (
        <nav style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#a1ffe9"
        }}>
            <div>
                <Link to="/" style={{  color: "black", textDecoration: "none", fontWeight: "bold"}}>TaskManager</Link>
            </div>

            <div style={{ display: "flex", gap: "15px", alignItems: "center"}}>
                {user ? (
                    <>
            <span style={{ marginRight: "10px"}}>
              Hello, {user.name}!
            </span>
                        <button onClick={handleLogout} onMouseEnter={() => setIsHoveredLogout(true)}
                                onMouseLeave={() => setIsHoveredLogout(false)}
                                style={{color: "black", borderRadius: "10px", padding: "5px 10px", cursor: "pointer",
                                    backgroundColor: isHoveredLogout ? "#c90227" : "#fa0230"}}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" onMouseEnter={() => setIsHoveredLogin(true)}
                              onMouseLeave={() => setIsHoveredLogin(false)} style={{color: "black", textDecoration: "none", borderRadius:
                                "10px", padding: "5px 10px", cursor: "pointer", border: "1px solid black", backgroundColor: isHoveredLogin ? "#b5ffb8" : "#e80712"}}>Login
                        </Link>

                        <Link to="/register" onMouseEnter={() => setIsHoveredRegister(true)}
                              onMouseLeave={() => setIsHoveredRegister(false)} style={{color: "black", textDecoration: "none", borderRadius:
                                "10px", padding: "5px 10px", cursor: "pointer", border: "1px solid black", backgroundColor: isHoveredRegister ? "#b5ffb8" : "#e80712"}}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )

}

export default Navbar;

