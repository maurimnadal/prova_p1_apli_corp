/**
 * EventModel - operações no banco relacionadas a eventos
 * @module models/EventModel
 */
const prisma = require("../config/prisma");

/**
 * Classe responsável pelas operações de eventos no banco de dados
 */
class EventModel {
  /**
   * Lista todos os eventos com informações do criador
   * @returns {Promise<Array>} Lista de eventos
   */
  static async listar() {
    return await prisma.event.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Busca um evento por ID
   * @param {number} id - ID do evento
   * @returns {Promise<Object|null>} Evento encontrado ou null
   */
  static async buscarPorId(id) {
    return await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Cria um novo evento
   * @param {Object} data - Dados do evento
   * @returns {Promise<Object>} Evento criado
   */
  static async criar({ title, description, date, location, max_volunteers, created_by }) {
    return await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date + 'T00:00:00'),
        location,
        maxVolunteers: max_volunteers,
        createdBy: created_by,
      },
    });
  }

  /**
   * Atualiza um evento existente
   * @param {number} id - ID do evento
   * @param {Object} data - Dados a atualizar
   * @returns {Promise<Object>} Evento atualizado
   */
  static async atualizar(id, { title, description, date, location, max_volunteers }) {
    return await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        date: new Date(date + 'T00:00:00'),
        location,
        maxVolunteers: max_volunteers,
      },
    });
  }

  /**
   * Remove um evento
   * @param {number} id - ID do evento
   * @returns {Promise<Object|null>} Evento removido ou null
   */
  static async remover(id) {
    const evento = await this.buscarPorId(id);
    if (!evento) return null;
    
    await prisma.event.delete({
      where: { id: parseInt(id) },
    });
    
    return evento;
  }
}

module.exports = EventModel;
