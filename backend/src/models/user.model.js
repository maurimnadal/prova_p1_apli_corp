/**
 * UserModel - operações no banco relacionadas a usuários
 * @module models/UserModel
 */
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

/**
 * Classe responsável pelas operações de usuários no banco de dados
 */
class UserModel {
  /**
   * Cria um novo usuário no banco de dados
   * @param {Object} data - Dados do usuário
   * @param {string} data.name - Nome do usuário
   * @param {string} data.email - Email do usuário
   * @param {string} data.password - Senha do usuário
   * @param {string} [data.role='volunteer'] - Role do usuário
   * @returns {Promise<Object>} Usuário criado
   */
  static async criar({ name, email, password, role = "volunteer" }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
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

    return user;
  }

  /**
   * Busca um usuário por email
   * @param {string} email - Email do usuário
   * @returns {Promise<Object|null>} Usuário encontrado ou null
   */
  static async buscarPorEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}

module.exports = UserModel;
