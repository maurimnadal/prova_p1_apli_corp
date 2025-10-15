/** EventModel - operações no banco relacionadas a eventos */
const pool = require("../config/db");

class EventModel {
  static async listar() {
    const [rows] = await pool.query(`
      SELECT e.*, u.name AS created_by_name
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
    `);
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    return rows[0];
  }

  static async criar({ title, description, date, location, max_volunteers, created_by }) {
    const [result] = await pool.query(
      "INSERT INTO events (title, description, date, location, max_volunteers, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, date, location, max_volunteers, created_by]
    );
    return { id: result.insertId, title, description, date, location, max_volunteers, created_by };
  }

  static async atualizar(id, { title, description, date, location, max_volunteers }) {
    await pool.query(
      "UPDATE events SET title=?, description=?, date=?, location=?, max_volunteers=? WHERE id=?",
      [title, description, date, location, max_volunteers, id]
    );
    return this.buscarPorId(id);
  }

  static async remover(id) {
    const evento = await this.buscarPorId(id);
    if (!evento) return null;
    await pool.query("DELETE FROM events WHERE id=?", [id]);
    return evento;
  }
}

module.exports = EventModel;
