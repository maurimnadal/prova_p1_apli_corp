const pool = require("../config/db");

class EventModel {
  static async listar() {
    const [rows] = await pool.query("SELECT * FROM events");
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    return rows[0];
  }

  static async criar({ titulo, descricao, data_evento }) {
    const [result] = await pool.query(
      "INSERT INTO events (titulo, descricao, data_evento) VALUES (?, ?, ?)",
      [titulo, descricao, data_evento]
    );
    return { id: result.insertId, titulo, descricao, data_evento };
  }

  static async atualizar(id, { titulo, descricao, data_evento }) {
    await pool.query(
      "UPDATE events SET titulo=?, descricao=?, data_evento=? WHERE id=?",
      [titulo, descricao, data_evento, id]
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
