import { useEffect, useState } from "react";
import api from "../api/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao carregar eventos");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Eventos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thTd}>ID</th>
            <th style={thTd}>Título</th>
            <th style={thTd}>Descrição</th>
            <th style={thTd}>Data</th>
            <th style={thTd}>Local</th>
            <th style={thTd}>Máx. Vol.</th>
          </tr>
        </thead>
        <tbody>
          {events.map(e => (
            <tr key={e.id}>
              <td style={thTd}>{e.id}</td>
              <td style={thTd}>{e.title}</td>
              <td style={thTd}>{e.description}</td>
              <td style={thTd}>{formatDate(e.date)}</td>
              <td style={thTd}>{e.location}</td>
              <td style={thTd}>{e.maxVolunteers || e.max_volunteers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thTd = { border: "1px solid #ccc", padding: "8px", textAlign: "left" };
