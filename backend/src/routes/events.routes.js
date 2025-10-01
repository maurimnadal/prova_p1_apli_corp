const express = require("express");
const EventController = require("../controllers/event.controller");

const router = express.Router();

router.get("/", EventController.listar);
router.get("/:id", EventController.buscarPorId);
router.post("/", EventController.criar);
router.put("/:id", EventController.atualizar);
router.delete("/:id", EventController.remover);

module.exports = router;
