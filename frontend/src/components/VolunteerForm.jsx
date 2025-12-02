// src/components/VolunteerForm.jsx
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

export default function VolunteerForm({ volunteer, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (volunteer) {
      setName(volunteer.name);
      setEmail(volunteer.email);
      setRole(volunteer.role);
    } else {
      setName(""); setEmail(""); setPassword(""); setRole("volunteer");
    }
  }, [volunteer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!name || !email || (!volunteer && !password)) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (volunteer) {
        await api.put(`/volunteers/${volunteer.id}`, { name, email, role, password: password || undefined }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSuccess("Voluntário atualizado com sucesso!");
      } else {
        await api.post("/volunteers", { name, email, password, role }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSuccess("Voluntário criado com sucesso!");
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Erro ao salvar voluntário:', err);
      const errorMsg = err.response?.data?.error || err.message || "Erro ao salvar voluntário";
      setError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>{volunteer ? "Editar Voluntário" : "Criar Voluntário"}</h3>
      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>{success}</div>}
      <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required={!volunteer} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="volunteer">Voluntário</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" style={{ ...buttonStyle, marginTop: "5px" }}>{volunteer ? "Atualizar" : "Criar"}</button>
    </form>
  );
}

const buttonStyle = { padding: "8px 15px", borderRadius: "5px", border: "none", cursor: "pointer", background: "#3498db", color: "#fff" };
