import { useState } from 'react';
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

const successStyle = {
  backgroundColor: '#efe',
  color: '#060',
  padding: '12px 15px',
  borderRadius: '5px',
  border: '1px solid #cfc',
  marginBottom: '15px',
  fontWeight: 'bold'
};

export default function EventForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxVolunteers, setMaxVolunteers] = useState(50);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!title || !description || !date || !location) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      await api.post('/events', { 
        title, 
        description, 
        date, 
        location, 
        max_volunteers: parseInt(maxVolunteers) || 50 
      });
      setSuccess('Evento criado com sucesso!');
      setTitle(''); setDescription(''); setDate(''); setLocation(''); setMaxVolunteers(50);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Erro ao criar evento:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Erro ao criar evento';
      setError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Criar Novo Evento</h3>
      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>{success}</div>}
      <input placeholder="Título" value={title} onChange={(e)=>setTitle(e.target.value)} required />
      <textarea placeholder="Descrição" value={description} onChange={(e)=>setDescription(e.target.value)} required />
      <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required />
      <input placeholder="Local" value={location} onChange={(e)=>setLocation(e.target.value)} required />
      <input
        type="number"
        placeholder="Máximo de voluntários" 
        value={maxVolunteers}
        onChange={(e)=>setMaxVolunteers(e.target.value)}
        min={1}
      />
      <button type="submit">Criar Evento</button>
    </form>
  );
}
