/**
 * Model: events
 */
const pool = require("../config/db");

module.exports = {
  async findAll() {
    const [rows] = await pool.query(
      "SELECT id, title, description, date, location, max_volunteers, created_by, created_at FROM events ORDER BY date"
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    return rows[0];
  },
  async create(event) {
    const {
      title,
      description,
      date,
      location,
      max_volunteers = 50,
      created_by,
    } = event;
    const [result] = await pool.query(
      "INSERT INTO events (title, description, date, location, max_volunteers, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, date, location, max_volunteers, created_by]
    );
    return { id: result.insertId, ...event };
  },
};
