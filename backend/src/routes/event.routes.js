const express = require("express");
const EventController = require("../controllers/event.controller");
const { authMiddleware, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// Listar todos os eventos (qualquer usuário autenticado)
router.get("/", authMiddleware, EventController.listar);

// Buscar evento por ID
router.get("/:id", authMiddleware, EventController.buscarPorId);

// Criar novo evento (apenas admin)
router.post("/", authMiddleware, authorize(["admin"]), EventController.criar);

// Atualizar evento (apenas admin)
router.put("/:id", authMiddleware, authorize(["admin"]), EventController.atualizar);

// Remover evento (apenas admin)
router.delete("/:id", authMiddleware, authorize(["admin"]), EventController.remover);

module.exports = router;
