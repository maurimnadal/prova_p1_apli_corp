/**
 * Regras relacionadas a autenticação
 */
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "troque_esta_chave_por_uma_segura";

module.exports = {
  async authenticate({ email, password }) {
    const user = await userModel.findByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    // Payload com email e role
    const token = jwt.sign(
      { email: user.email, role: user.role, id: user.id },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  },
};
