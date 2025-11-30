/** Auth Service */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const logger = require("../config/logger");

const JWT_SECRET = process.env.JWT_SECRET || "segredoSuperSecreto";

/**
 * AuthService - register and login users
 */
const AuthService = {
  register: async ({ name, email, password, role = "volunteer" }) => {
    if (!name || !email || !password) throw new Error("Preencha todos os campos");

    const userExists = await UserModel.buscarPorEmail(email);
    if (userExists) {
      logger.warn('Tentativa de registro com email existente', { email });
      throw new Error("Usuário já registrado");
    }

    const newUser = await UserModel.criar({ name, email, password, role });
    logger.info('Novo usuário registrado', { userId: newUser.id, email });
    return newUser;
  },

  login: async (email, password) => {
    const user = await UserModel.buscarPorEmail(email);
    if (!user) {
      logger.warn('Tentativa de login com email inválido', { email });
      throw new Error("Usuário não encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      logger.warn('Tentativa de login com senha incorreta', { email });
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info('Login realizado com sucesso', { userId: user.id, email });
    return { token };
  },
};

module.exports = AuthService;
