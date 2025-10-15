// src/routes/volunteer.routes.js
const express = require("express");
const VolunteerController = require("../controllers/volunteer.controller");
const { authMiddleware, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * Todas as rotas de volunteer são protegidas
 * Apenas admin pode criar, atualizar ou remover
 */
router.get("/", authMiddleware, VolunteerController.listar);
router.get("/:id", authMiddleware, VolunteerController.buscarPorId);
router.post("/", authMiddleware, authorize(["admin"]), VolunteerController.criar);
router.put("/:id", authMiddleware, VolunteerController.atualizar);
router.delete("/:id", authMiddleware, authorize(["admin"]), VolunteerController.remover);

module.exports = router;
