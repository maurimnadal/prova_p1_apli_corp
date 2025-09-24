/**
 * Model: users
 * Responsabilidade: operações CRUD diretas na tabela users
 */
const pool = require("../config/db");

module.exports = {
  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT id, name, email, password, role FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },
  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },
  async create({ name, email, password, role = "volunteer" }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role]
    );
    return { id: result.insertId, name, email, role };
  },
};
