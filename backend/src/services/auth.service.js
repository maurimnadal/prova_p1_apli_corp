/** Auth Service */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "segredoSuperSecreto";

/**
 * AuthService - register and login users
 */
const AuthService = {
  register: async ({ name, email, password, role = "volunteer" }) => {
    if (!name || !email || !password) throw new Error("Preencha todos os campos");

    const userExists = await UserModel.buscarPorEmail(email);
    if (userExists) throw new Error("Usuário já registrado");

    const newUser = await UserModel.criar({ name, email, password, role });
    return newUser;
  },

  login: async (email, password) => {
    const user = await UserModel.buscarPorEmail(email);
    if (!user) throw new Error("Usuário não encontrado");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Senha incorreta");

    // Include id, name, email and role in token payload
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  },
};

module.exports = AuthService;
