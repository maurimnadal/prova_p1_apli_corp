import { useEffect, useState } from 'react';
import api from '../api/api';

export default function EventList({ showAdminActions = false, refreshTrigger = 0 }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (err) {
      setError('Erro ao carregar eventos');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      setError('Erro ao remover evento');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <div>
            <strong>{event.title}</strong> - {event.description} | {event.date} | {event.location}
          </div>
          {showAdminActions && <button onClick={() => handleDelete(event.id)}>Excluir</button>}
        </li>
      ))}
    </ul>
  );
}
