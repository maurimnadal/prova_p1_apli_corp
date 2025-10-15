import { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import api from '../api/api';

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);
  const [user, setUser] = useState({ name: '', email: '', role: 'volunteer' });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchUser = async () => {
    try {
      const res = await api.get('/dashboard');
      setUser(res.data.user);
      setFormData({ name: res.data.user.name || '', email: res.data.user.email || '', password: '' });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const handleRefresh = () => setRefresh(prev => prev + 1);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password; // não envia senha vazia

      await api.put(`/volunteers/${user.id}`, payload);
      setSuccess('Dados atualizados com sucesso!');
      setError('');
      setEditMode(false);
      fetchUser();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao atualizar dados');
      setSuccess('');
    }
  };

  return (
    <div className="container">
      <header><h1>Dashboard</h1></header>
      <p>Bem-vindo(a) {user.name || user.email} ({user.role})</p>

      {user.role === 'admin' && (
        <>
          <h2>Criar Evento</h2>
          <EventForm onSuccess={handleRefresh} />
        </>
      )}

      <h2>Eventos</h2>
      <EventList showAdminActions={user.role === 'admin'} refreshTrigger={refresh} />

      {user.role === 'volunteer' && (
        <>
          <h2>Seus Dados</h2>
          {success && <p style={{ color: 'green' }}>{success}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {editMode ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Nova senha (opcional)"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
            </form>
          ) : (
            <div>
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={() => setEditMode(true)}>Editar meus dados</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
