// src/components/Header.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role);
      } catch {
        setUserRole(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    navigate("/");
  };

  return (
    <header style={headerStyle}>
      <h1 style={{ color: "#fff" }}>IFRS Voluntariado</h1>
      <nav style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <button style={buttonStyle} onClick={() => navigate("/")}>Home</button>
        <button style={buttonStyle} onClick={() => navigate("/events")}>Eventos</button>
        {userRole && <button style={buttonStyle} onClick={() => navigate("/dashboard")}>Dashboard</button>}
        {userRole === "admin" && <button style={buttonStyle} onClick={() => navigate("/volunteers")}>Voluntários</button>}
        {!userRole && <button style={buttonStyle} onClick={() => navigate("/login")}>Login</button>}
        {userRole && <button style={{ ...buttonStyle, background: "#e74c3c" }} onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px 30px",
  background: "#3498db",
  flexWrap: "wrap"
};

const buttonStyle = {
  padding: "8px 15px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  background: "#2980b9",
  color: "#fff",
  fontSize: "1rem",
};
