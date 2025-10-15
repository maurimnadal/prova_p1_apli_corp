// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
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
    }
  }, []);

  const handleLogin = () => navigate('/login');
  const handleDashboard = () => navigate('/dashboard');
  const handleEvents = () => navigate('/events');
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserRole(null);
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      background: '#f0f4f8',
      padding: '20px'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.5rem' }}>IFRS Voluntariado</h1>
        <p style={{ color: '#34495e', fontSize: '1.2rem' }}>Organize e participe de eventos de voluntariado</p>
      </header>



      {userRole && (
        <p style={{ marginTop: '20px', color: '#2c3e50' }}>
          Logado como <strong>{userRole}</strong>
        </p>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  background: '#3498db',
  color: '#fff',
  transition: 'all 0.3s ease',
};

