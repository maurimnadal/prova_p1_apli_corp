/**
 * Rotas de Voluntários
 * @module routes/volunteers
 * 
 * Todas as rotas são protegidas por autenticação
 * Apenas admin pode criar e remover
 */
const express = require("express");
const VolunteerController = require("../controllers/volunteer.controller");
const { authMiddleware, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();
router.get("/", authMiddleware, VolunteerController.listar);
router.get("/:id", authMiddleware, VolunteerController.buscarPorId);
router.post("/", authMiddleware, authorize(["admin"]), VolunteerController.criar);
router.put("/:id", authMiddleware, VolunteerController.atualizar);
router.delete("/:id", authMiddleware, authorize(["admin"]), VolunteerController.remover);

module.exports = router;
