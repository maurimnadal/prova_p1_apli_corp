/**
 * Rotas de Autenticação
 * @module routes/auth
 * 
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth endpoints
 */

const express = require("express");
const AuthController = require("../controllers/auth.controller");

const router = express.Router();

/**
 * POST /auth/register - Registra um novo usuário
 */
router.post("/register", AuthController.register);

/**
 * POST /auth/login - Realiza login e retorna token JWT
 */
router.post("/login", AuthController.login);

module.exports = router;
