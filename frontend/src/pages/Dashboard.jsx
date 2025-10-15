import { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import api from '../api/api';

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);
  const [user, setUser] = useState({ name: '', role: 'volunteer' });
  
  const fetchUser = async () => {
    try {
      const res = await api.get('/dashboard');
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const handleRefresh = () => setRefresh(prev => prev + 1);

  return (
    <div className="container">
      <header><h1>Dashboard</h1></header>
      <p>Bem-vindo(a) {user.name || user.email} ({user.role})</p>
      {user.role === 'admin' && <EventForm onSuccess={handleRefresh} />}
      <EventList showAdminActions={user.role === 'admin'} refreshTrigger={refresh} />
    </div>
  );
}
