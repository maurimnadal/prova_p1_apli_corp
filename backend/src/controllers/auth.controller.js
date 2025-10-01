const AuthService = require("../services/auth.service");

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Preencha todos os campos" });
      }

      const newUser = await AuthService.register({ name, email, password, role });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message || "Erro ao registrar usuário" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Preencha email e senha" });
      }

      const { token } = await AuthService.login(email, password);
      res.json({ token });
    } catch (err) {
      res.status(401).json({ error: err.message || "Erro ao realizar login" });
    }
  }
}

module.exports = AuthController;
