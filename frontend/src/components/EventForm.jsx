import { useState } from 'react';
import api from '../api/api';

export default function EventForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxVolunteers, setMaxVolunteers] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !location) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    try {
      await api.post('/events', { title, description, date, location, max_volunteers: maxVolunteers });
      setSuccess('Evento criado com sucesso!');
      setError('');
      setTitle(''); setDescription(''); setDate(''); setLocation(''); setMaxVolunteers(50);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar evento');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Criar Novo Evento</h3>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
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
