import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const errorStyle = {
  backgroundColor: '#fee',
  color: '#c00',
  padding: '12px 15px',
  borderRadius: '5px',
  border: '1px solid #fcc',
  marginBottom: '15px',
  fontWeight: 'bold'
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      let errorMsg = 'Erro ao logar';
      
      if (err.response && err.response.data && err.response.data.error) {
        errorMsg = err.response.data.error;
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      console.log('Definindo erro:', errorMsg);
      setError(errorMsg);
    }
  };

  return (
    <div className="container">
      <header><h1>Login</h1></header>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
