/**
 * Rotas do Dashboard
 * @module routes/dashboard
 */
const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboard.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

/**
 * GET /dashboard - Acessa o dashboard do usuário autenticado
 */
router.get("/", authMiddleware, DashboardController.acessar);

module.exports = router;
