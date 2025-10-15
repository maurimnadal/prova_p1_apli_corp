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

  useEffect(() => { fetchEvents(); }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      setError('Erro ao remover evento');
    }
  };

  const handleEdit = async (event) => {
    try {
      const title = prompt('Título:', event.title) || event.title;
      const description = prompt('Descrição:', event.description) || event.description;
      const date = prompt('Data (YYYY-MM-DD):', event.date) || event.date;
      const location = prompt('Local:', event.location) || event.location;
      const maxVolunteers = parseInt(prompt('Máx. voluntários:', event.max_volunteers), 10) || event.max_volunteers;

      await api.put(`/events/${event.id}`, { title, description, date, location, max_volunteers: maxVolunteers });
      fetchEvents();
    } catch (err) {
      setError('Erro ao atualizar evento');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <ul style={listStyle}>
      {events.map((event) => (
        <li key={event.id} style={itemStyle}>
          <div style={eventInfoStyle}>
            <strong>{event.title}</strong>
            <span>{event.description}</span>
            <span>{event.date}</span>
            <span>{event.location}</span>
            <span>Máx. voluntários: {event.max_volunteers}</span>
          </div>
          {showAdminActions && (
            <div style={actionsStyle}>
              <button style={editButtonStyle} onClick={() => handleEdit(event)}>Editar</button>
              <button style={deleteButtonStyle} onClick={() => handleDelete(event.id)}>Excluir</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

// Estilos
const listStyle = {
  listStyle: 'none',
  padding: 0,
  maxWidth: '800px',
  margin: '0 auto',
};

const itemStyle = {
  background: '#fff',
  padding: '15px 20px',
  borderRadius: '8px',
  marginBottom: '15px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const eventInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  color: '#2c3e50',
};

const actionsStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
};

const buttonBase = {
  padding: '8px 15px',
  fontSize: '0.9rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const editButtonStyle = {
  ...buttonBase,
  background: '#3498db',
  color: '#fff',
};

const deleteButtonStyle = {
  ...buttonBase,
  background: '#e74c3c',
  color: '#fff',
};
