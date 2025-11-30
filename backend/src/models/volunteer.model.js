/**
 * VolunteerModel - operações no banco relacionadas a voluntários
 * @module models/VolunteerModel
 */
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

/**
 * Classe responsável pelas operações de voluntários no banco de dados
 */
class VolunteerModel {
  /**
   * Lista todos os voluntários
   * @returns {Promise<Array>} Lista de voluntários
   */
  static async listar() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  /**
   * Busca um voluntário por ID
   * @param {number} id - ID do voluntário
   * @returns {Promise<Object|null>} Voluntário encontrado ou null
   */
  static async buscarPorId(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  /**
   * Cria um novo voluntário
   * @param {Object} data - Dados do voluntário
   * @returns {Promise<Object>} Voluntário criado
   */
  static async criar({ name, email, password, role = "volunteer" }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  /**
   * Atualiza um voluntário existente
   * @param {number} id - ID do voluntário
   * @param {Object} data - Dados a atualizar
   * @returns {Promise<Object>} Voluntário atualizado
   */
  static async atualizar(id, { name, email, password }) {
    const updateData = { name, email };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  /**
   * Remove um voluntário
   * @param {number} id - ID do voluntário
   * @returns {Promise<Object|null>} Voluntário removido ou null
   */
  static async remover(id) {
    const volunteer = await this.buscarPorId(id);
    if (!volunteer) return null;
    
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    
    return volunteer;
  }
}

module.exports = VolunteerModel;
