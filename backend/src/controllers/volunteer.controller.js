// src/controllers/volunteer.controller.js
const VolunteerService = require("../services/volunteer.service");

class VolunteerController {
  static async listar(req, res) {
    try {
      const volunteers = await VolunteerService.listar();
      res.json(volunteers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const volunteer = await VolunteerService.buscarPorId(id);
      res.json(volunteer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async criar(req, res) {
    try {
      const newVolunteer = await VolunteerService.criar(req.body);
      res.status(201).json(newVolunteer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const updatedVolunteer = await VolunteerService.atualizar(id, req.body);
      res.json(updatedVolunteer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async remover(req, res) {
    try {
      const id = parseInt(req.params.id);
      const volunteer = await VolunteerService.remover(id);
      res.json({ message: "Voluntário removido", volunteer });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = VolunteerController;
