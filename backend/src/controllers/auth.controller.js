/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas de autenticação e registro de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *               role:
 *                 type: string
 *                 description: Papel do usuário (ex: admin, volunteer)
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login de usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticação
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Email ou senha incorretos
 */

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
