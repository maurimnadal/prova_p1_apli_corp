/**
 * Rotas de Eventos
 * @module routes/events
 * 
 * @swagger
 * tags:
 *   name: Events
 *   description: Events endpoints
 */

const express = require("express");
const EventController = require("../controllers/event.controller");
const { authMiddleware, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * GET /events - Lista todos os eventos (qualquer usuário autenticado)
 */
router.get("/", authMiddleware, EventController.listar);

/**
 * GET /events/:id - Busca evento por ID
 */
router.get("/:id", authMiddleware, EventController.buscarPorId);

/**
 * POST /events - Cria novo evento (apenas admin)
 */
router.post("/", authMiddleware, authorize(["admin"]), EventController.criar);

/**
 * PUT /events/:id - Atualiza evento (apenas admin)
 */
router.put("/:id", authMiddleware, authorize(["admin"]), EventController.atualizar);

/**
 * DELETE /events/:id - Remove evento (apenas admin)
 */
router.delete("/:id", authMiddleware, authorize(["admin"]), EventController.remover);

module.exports = router;
