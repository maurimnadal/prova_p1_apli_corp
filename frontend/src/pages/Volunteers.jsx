import { useEffect, useState } from "react";
import api from "../api/api";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Voluntários</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thTd}>ID</th>
            <th style={thTd}>Nome</th>
            <th style={thTd}>Email</th>
            <th style={thTd}>Role</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(v => (
            <tr key={v.id}>
              <td style={thTd}>{v.id}</td>
              <td style={thTd}>{v.name}</td>
              <td style={thTd}>{v.email}</td>
              <td style={thTd}>{v.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thTd = { border: "1px solid #ccc", padding: "8px", textAlign: "left" };
