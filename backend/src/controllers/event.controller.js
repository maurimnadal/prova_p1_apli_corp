const EventService = require("../services/event.service");

class EventController {
  static async listar(req, res) {
    try {
      const eventos = await EventService.listar();
      res.json(eventos);
    } catch (err) {
      res.status(500).json({ error: err.message || "Erro ao listar eventos" });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const evento = await EventService.buscarPorId(id);

      if (!evento) return res.status(404).json({ error: "Evento não encontrado" });
      res.json(evento);
    } catch (err) {
      res.status(500).json({ error: err.message || "Erro ao buscar evento" });
    }
  }

  static async criar(req, res) {
    try {
      const { title, description, date, location, max_volunteers } = req.body;
      const created_by = req.user.id; // pega do token JWT

      const novoEvento = await EventService.criar({
        title,
        description,
        date,
        location,
        max_volunteers,
        created_by,
      });

      res.status(201).json(novoEvento);
    } catch (err) {
      res.status(400).json({ error: err.message || "Erro ao criar evento" });
    }
  }

  static async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { title, description, date, location, max_volunteers } = req.body;

      const atualizado = await EventService.atualizar(id, {
        title,
        description,
        date,
        location,
        max_volunteers,
      });

      res.json(atualizado);
    } catch (err) {
      res.status(400).json({ error: err.message || "Erro ao atualizar evento" });
    }
  }

  static async remover(req, res) {
    try {
      const id = parseInt(req.params.id);
      const removido = await EventService.remover(id);
      res.json({ message: "Evento removido", removido });
    } catch (err) {
      res.status(400).json({ error: err.message || "Erro ao remover evento" });
    }
  }
}

module.exports = EventController;
