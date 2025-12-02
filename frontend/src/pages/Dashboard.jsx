import { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import VolunteerForm from '../components/VolunteerForm';
import api from '../api/api';

export default function Dashboard() {
  const [user, setUser] = useState({ name: '', email: '', role: 'volunteer' });
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
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

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const res = await api.get('/volunteers');
      setVolunteers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchEvents();
  }, []);

  useEffect(() => {
    if (user.role === 'admin') fetchVolunteers();
  }, [user.role]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

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

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      setError('Erro ao deletar evento');
    }
  };

  const handleDeleteVolunteer = async (id) => {
    try {
      await api.delete(`/volunteers/${id}`);
      fetchVolunteers();
    } catch (err) {
      setError('Erro ao deletar voluntário');
    }
  };

  const handleEventSuccess = () => {
    setSelectedEvent(null);
    fetchEvents();
  };

  const handleVolunteerSuccess = () => {
    setSelectedVolunteer(null);
    fetchVolunteers();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>Dashboard</h1>
        <p style={{ margin: '10px 0 0 0', color: '#7f8c8d' }}>Bem-vindo(a), <strong>{user.name || user.email}</strong> ({user.role})</p>
      </div>

      {user.role === 'admin' && (
        <>
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Gerenciar Eventos</h2>
            <EventForm event={selectedEvent} onSuccess={handleEventSuccess} />
            <div style={tableWrapperStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr style={theadRowStyle}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Título</th>
                    <th style={thStyle}>Descrição</th>
                    <th style={thStyle}>Data</th>
                    <th style={thStyle}>Local</th>
                    <th style={thStyle}>Máx. Vol.</th>
                    <th style={thStyle}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(e => (
                    <tr key={e.id} style={tbodyRowStyle}>
                      <td style={tdStyle}>{e.id}</td>
                      <td style={tdStyle}>{e.title}</td>
                      <td style={tdStyle}>{e.description}</td>
                      <td style={tdStyle}>{formatDate(e.date)}</td>
                      <td style={tdStyle}>{e.location}</td>
                      <td style={tdStyle}>{e.maxVolunteers || e.max_volunteers}</td>
                      <td style={tdStyle}>
                        <button style={editBtnStyle} onClick={() => setSelectedEvent(e)}>Editar</button>
                        <button style={deleteBtnStyle} onClick={() => handleDeleteEvent(e.id)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Gerenciar Voluntários</h2>
            <VolunteerForm volunteer={selectedVolunteer} onSuccess={handleVolunteerSuccess} />
            <div style={tableWrapperStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr style={theadRowStyle}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Nome</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map(v => (
                    <tr key={v.id} style={tbodyRowStyle}>
                      <td style={tdStyle}>{v.id}</td>
                      <td style={tdStyle}>{v.name}</td>
                      <td style={tdStyle}>{v.email}</td>
                      <td style={tdStyle}>{v.role}</td>
                      <td style={tdStyle}>
                        <button style={editBtnStyle} onClick={() => setSelectedVolunteer(v)}>Editar</button>
                        <button style={deleteBtnStyle} onClick={() => handleDeleteVolunteer(v.id)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {user.role === 'volunteer' && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Seus Dados</h2>
          {success && <div style={successMsgStyle}>{success}</div>}
          {error && <div style={errorMsgStyle}>{error}</div>}
          {editMode ? (
            <form onSubmit={handleUpdate} style={formStyle}>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Nova senha (opcional)"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={saveBtnStyle}>Salvar</button>
                <button type="button" onClick={() => setEditMode(false)} style={cancelBtnStyle}>Cancelar</button>
              </div>
            </form>
          ) : (
            <div style={profileInfoStyle}>
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={() => setEditMode(true)} style={editBtnStyle}>Editar meus dados</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '30px 20px',
  backgroundColor: '#f8f9fa'
};

const headerStyle = {
  backgroundColor: '#fff',
  padding: '25px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  marginBottom: '30px'
};

const sectionStyle = {
  backgroundColor: '#fff',
  padding: '25px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  marginBottom: '30px'
};

const sectionTitleStyle = {
  color: '#2c3e50',
  marginTop: 0,
  marginBottom: '20px',
  borderBottom: '2px solid #3498db',
  paddingBottom: '10px'
};

const tableWrapperStyle = {
  overflowX: 'auto',
  marginTop: '20px'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff'
};

const theadRowStyle = {
  backgroundColor: '#3498db',
  color: '#fff'
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: '600',
  borderBottom: '2px solid #2980b9'
};

const tbodyRowStyle = {
  borderBottom: '1px solid #ecf0f1',
  transition: 'background-color 0.2s'
};

const tdStyle = {
  padding: '12px',
  color: '#2c3e50'
};

const editBtnStyle = {
  padding: '6px 12px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#3498db',
  color: '#fff',
  marginRight: '5px',
  fontSize: '14px',
  transition: 'background-color 0.2s'
};

const deleteBtnStyle = {
  padding: '6px 12px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#e74c3c',
  color: '#fff',
  fontSize: '14px',
  transition: 'background-color 0.2s'
};

const successMsgStyle = {
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '12px 15px',
  borderRadius: '5px',
  border: '1px solid #c3e6cb',
  marginBottom: '15px'
};

const errorMsgStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '12px 15px',
  borderRadius: '5px',
  border: '1px solid #f5c6cb',
  marginBottom: '15px'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  maxWidth: '500px'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  fontSize: '14px'
};

const saveBtnStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#27ae60',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600'
};

const cancelBtnStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#95a5a6',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600'
};

const profileInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};
