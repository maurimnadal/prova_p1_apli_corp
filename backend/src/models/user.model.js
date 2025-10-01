const pool = require("../config/db");
const bcrypt = require("bcryptjs");

class UserModel {
  static async criar({ name, email, password, role = "volunteer" }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    return { id: result.insertId, name, email, role };
  }

  static async buscarPorEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  static async validarSenha(user, password) {
    return await bcrypt.compare(password, user.password);
  }
}

module.exports = UserModel;
