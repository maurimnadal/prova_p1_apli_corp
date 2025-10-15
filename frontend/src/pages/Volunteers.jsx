// src/pages/Volunteers.jsx
import { useEffect, useState } from "react";
import api from "../api/api";
import VolunteerForm from "../components/VolunteerForm";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [error, setError] = useState("");

  const fetchVolunteers = async () => {
    try {
      const res = await api.get("/volunteers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setVolunteers(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao carregar voluntários");
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleEdit = (volunteer) => setSelectedVolunteer(volunteer);
  const handleDelete = async (id) => {
    try {
      await api.delete(`/volunteers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchVolunteers();
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao deletar voluntário");
    }
  };

  const handleSuccess = () => {
    setSelectedVolunteer(null);
    fetchVolunteers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Voluntários</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <VolunteerForm volunteer={selectedVolunteer} onSuccess={handleSuccess} />
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thTd}>ID</th>
            <th style={thTd}>Nome</th>
            <th style={thTd}>Email</th>
            <th style={thTd}>Role</th>
            <th style={thTd}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(v => (
            <tr key={v.id}>
              <td style={thTd}>{v.id}</td>
              <td style={thTd}>{v.name}</td>
              <td style={thTd}>{v.email}</td>
              <td style={thTd}>{v.role}</td>
              <td style={thTd}>
                <button style={buttonStyle} onClick={() => handleEdit(v)}>Editar</button>
                <button style={{ ...buttonStyle, background: "#e74c3c", marginLeft: "5px" }} onClick={() => handleDelete(v.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thTd = { border: "1px solid #ccc", padding: "8px", textAlign: "left" };
const buttonStyle = { padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer", background: "#3498db", color: "#fff" };
