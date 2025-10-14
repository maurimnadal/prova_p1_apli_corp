import { useState } from 'react';
import api from '../api/api';

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
    if (!title || !description || !date || !location) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await api.post(
        '/events',
        { title, description, date, location, max_volunteers: maxVolunteers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Evento criado com sucesso!');
      setError('');
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setMaxVolunteers(50);
      if (onSuccess) onSuccess(); // atualiza lista
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar evento');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Novo Evento</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Data"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Localização"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Número máximo de voluntários"
        value={maxVolunteers}
        onChange={(e) => setMaxVolunteers(e.target.value)}
        min={1}
      />
      <button type="submit">Criar Evento</button>
    </form>
  );
}
