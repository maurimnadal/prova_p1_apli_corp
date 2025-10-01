const EventModel = require("../models/event.model");

class EventController {
  static async listar(req, res) {
    try {
      const eventos = await EventModel.listar();
      res.json(eventos);
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar eventos" });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const evento = await EventModel.buscarPorId(parseInt(req.params.id));
      if (!evento) return res.status(404).json({ error: "Evento não encontrado" });
      res.json(evento);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar evento" });
    }
  }

  static async criar(req, res) {
    try {
      const { titulo, descricao, data_evento } = req.body;
      if (!titulo || !descricao || !data_evento) {
        return res.status(400).json({ error: "Preencha todos os campos" });
      }
      const novoEvento = await EventModel.criar({ titulo, descricao, data_evento });
      res.status(201).json(novoEvento);
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar evento" });
    }
  }

  static async atualizar(req, res) {
    try {
      const { titulo, descricao, data_evento } = req.body;
      const atualizado = await EventModel.atualizar(parseInt(req.params.id), {
        titulo,
        descricao,
        data_evento,
      });
      if (!atualizado) return res.status(404).json({ error: "Evento não encontrado" });
      res.json(atualizado);
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar evento" });
    }
  }

  static async remover(req, res) {
    try {
      const removido = await EventModel.remover(parseInt(req.params.id));
      if (!removido) return res.status(404).json({ error: "Evento não encontrado" });
      res.json({ message: "Evento removido", removido });
    } catch (err) {
      res.status(500).json({ error: "Erro ao remover evento" });
    }
  }
}

module.exports = EventController;
