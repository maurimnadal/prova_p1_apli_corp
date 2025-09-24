/**
 * Regras de negócio para eventos
 */
const eventModel = require("../models/event.model");

module.exports = {
  async listEvents() {
    return eventModel.findAll();
  },
  async createEvent(event) {
    // validações simples: título e data
    if (!event.title) throw { status: 400, message: "title is required" };
    if (!event.date) throw { status: 400, message: "date is required" };
    // max_volunteers deve ser inteiro positivo
    if (event.max_volunteers && !Number.isInteger(event.max_volunteers))
      throw { status: 400, message: "max_volunteers must be integer" };
    // delega ao model
    return eventModel.create(event);
  },
};
