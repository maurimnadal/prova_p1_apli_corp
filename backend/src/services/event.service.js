/**
 * Event Service - Lógica de negócio para eventos
 * @module services/EventService
 */
const EventModel = require("../models/event.model");
const logger = require("../config/logger");

const EventService = {
  listar: async () => {
    logger.info('Listando todos os eventos');
    return await EventModel.listar();
  },

  buscarPorId: async (id) => {
    logger.info('Buscando evento por ID', { eventId: id });
    return await EventModel.buscarPorId(id);
  },

  criar: async ({ title, description, date, location, max_volunteers = 50, created_by }) => {
    if (!title || !date) {
      logger.warn('Tentativa de criar evento sem campos obrigatórios');
      throw new Error("Preencha os campos obrigatórios");
    }

    const event = await EventModel.criar({ title, description, date, location, max_volunteers, created_by });
    logger.info('Evento criado com sucesso', { eventId: event.id, title });
    return event;
  },

  atualizar: async (id, { title, description, date, location, max_volunteers }) => {
    const eventExist = await EventModel.buscarPorId(id);
    if (!eventExist) {
      logger.warn('Tentativa de atualizar evento inexistente', { eventId: id });
      throw new Error("Evento não encontrado");
    }

    const updated = await EventModel.atualizar(id, { title, description, date, location, max_volunteers });
    logger.info('Evento atualizado com sucesso', { eventId: id });
    return updated;
  },

  remover: async (id) => {
    const eventExist = await EventModel.buscarPorId(id);
    if (!eventExist) {
      logger.warn('Tentativa de remover evento inexistente', { eventId: id });
      throw new Error("Evento não encontrado");
    }

    const removed = await EventModel.remover(id);
    logger.info('Evento removido com sucesso', { eventId: id });
    return removed;
  },
};

module.exports = EventService;
