import { useState, useEffect } from "react";
import api from "../api/api";

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

export default function EventForm({ event, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [maxVolunteers, setMaxVolunteers] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date?.split('T')[0] || "");
      setLocation(event.location);
      setMaxVolunteers(event.maxVolunteers || event.max_volunteers || "");
    } else {
      setTitle(""); setDescription(""); setDate(""); setLocation(""); setMaxVolunteers("");
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!title || !description || !date || !location || !maxVolunteers) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const payload = { 
        title, 
        description, 
        date, 
        location, 
        max_volunteers: parseInt(maxVolunteers) 
      };

      if (event) {
        await api.put(`/events/${event.id}`, payload);
        setSuccess("Evento atualizado com sucesso!");
      } else {
        await api.post("/events", payload);
        setSuccess("Evento criado com sucesso!");
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Erro ao salvar evento:', err);
      const errorMsg = err.response?.data?.error || err.message || "Erro ao salvar evento";
      setError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>{event ? "Editar Evento" : "Criar Evento"}</h3>
      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>{success}</div>}
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} required />
      <input placeholder="Data" type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input placeholder="Local" value={location} onChange={e => setLocation(e.target.value)} required />
      <input placeholder="Máx. voluntários" type="number" value={maxVolunteers} onChange={e => setMaxVolunteers(e.target.value)} required />
      <button type="submit" style={{ ...buttonStyle, marginTop: "5px" }}>{event ? "Atualizar" : "Criar"}</button>
    </form>
  );
}

const buttonStyle = { padding: "8px 15px", borderRadius: "5px", border: "none", cursor: "pointer", background: "#3498db", color: "#fff" };
