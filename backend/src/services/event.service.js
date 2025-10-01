const pool = require("../config/db");

const EventService = {
  listar: async () => {
    const [rows] = await pool.query(`
      SELECT e.*, u.name AS created_by_name
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      ORDER BY e.date ASC
    `);
    return rows;
  },

  buscarPorId: async (id) => {
    const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    return rows[0];
  },

  criar: async ({ title, description, date, location, max_volunteers = 50, created_by }) => {
    if (!title || !date) throw new Error("Preencha os campos obrigatórios");

    const [result] = await pool.query(
      "INSERT INTO events (title, description, date, location, max_volunteers, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, date, location, max_volunteers, created_by]
    );

    return { id: result.insertId, title, description, date, location, max_volunteers, created_by };
  },

  atualizar: async (id, { title, description, date, location, max_volunteers }) => {
    const eventExist = await EventService.buscarPorId(id);
    if (!eventExist) throw new Error("Evento não encontrado");

    await pool.query(
      "UPDATE events SET title=?, description=?, date=?, location=?, max_volunteers=? WHERE id=?",
      [title, description, date, location, max_volunteers, id]
    );

    return EventService.buscarPorId(id);
  },

  remover: async (id) => {
    const eventExist = await EventService.buscarPorId(id);
    if (!eventExist) throw new Error("Evento não encontrado");

    await pool.query("DELETE FROM events WHERE id=?", [id]);
    return eventExist;
  },
};

module.exports = EventService;
