import { useState } from 'react';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import '../index.css';

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);

  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : 'volunteer';

  const handleRefresh = () => setRefresh((prev) => prev + 1);

  return (
    <div className="container">
      <header>
        <h1>Dashboard</h1>
      </header>
      <p>Bem-vindo(a) ({userRole})</p>

      {userRole === 'admin' && <EventForm onSuccess={handleRefresh} />}
      <EventList showAdminActions={userRole === 'admin'} refreshTrigger={refresh} />
    </div>
  );
}
