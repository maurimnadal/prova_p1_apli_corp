// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
      } catch (e) {
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserRole(null);
    navigate('/');
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/events" style={linkStyle}>Eventos</Link>
        {userRole && <Link to="/dashboard" style={linkStyle}>Dashboard</Link>}
        {!userRole && <Link to="/login" style={linkStyle}>Login</Link>}
        {userRole && <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>}
      </nav>
    </header>
  );
}

const headerStyle = {
  width: '100%',
  background: '#3498db',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const navStyle = {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1rem',
};

const logoutButtonStyle = {
  background: '#e74c3c',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};
