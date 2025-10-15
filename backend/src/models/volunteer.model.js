// src/models/volunteer.model.js
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

class VolunteerModel {
  static async listar() {
    const [rows] = await pool.query("SELECT id, name, email, role FROM users");
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await pool.query(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async criar({ name, email, password, role = "volunteer" }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    return { id: result.insertId, name, email, role };
  }

  static async atualizar(id, { name, email, role, password }) {
    let query = "UPDATE users SET name=?, email=?, role=?";
    const params = [name, email, role];

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      query += ", password=?";
      params.push(hashedPassword);
    }

    query += " WHERE id=?";
    params.push(id);

    await pool.query(query, params);
    return this.buscarPorId(id);
  }

  static async remover(id) {
    const volunteer = await this.buscarPorId(id);
    if (!volunteer) return null;
    await pool.query("DELETE FROM users WHERE id=?", [id]);
    return volunteer;
  }
}

module.exports = VolunteerModel;
