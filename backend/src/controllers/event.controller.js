/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Rotas para gerenciamento de eventos
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Lista todos os eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   location:
 *                     type: string
 *                   max_volunteers:
 *                     type: integer
 *                   created_by:
 *                     type: integer
 *       500:
 *         description: Erro ao listar eventos
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Busca um evento específico pelo ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 location:
 *                   type: string
 *                 max_volunteers:
 *                   type: integer
 *       404:
 *         description: Evento não encontrado
 *       500:
 *         description: Erro ao buscar evento
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Cria um novo evento (apenas administradores)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - location
 *               - max_volunteers
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               max_volunteers:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       400:
 *         description: Dados inválidos ou erro na criação
 */

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               max_volunteers:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar evento
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Remove um evento existente
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento removido com sucesso
 *       400:
 *         description: Erro ao remover evento
 */

const EventService = require("../services/event.service");

class EventController {
  static async listar(req, res) {
    try {
      const eventos = await EventService.listar();
      res.json(eventos);
    } catch (err) {
      res.status(500).json({ error: err.message || "Erro ao listar eventos" });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const evento = await EventService.buscarPorId(id);

      if (!evento) return res.status(404).json({ error: "Evento não encontrado" });
      res.json(evento);
    } catch (err) {
      res.status(500).json({ error: err.message || "Erro ao buscar evento" });
    }
  }

  static async criar(req, res) {
    try {
      const { title, description, date, location, max_volunteers } = req.body;
      const created_by = req.user.id; // pega do token JWT

      const novoEvento = await EventService.criar({
        title,
        description,
        date,
        location,
        max_volunteers,
        created_by,
      });

      res.status(201).json(novoEvento);
    } catch (err) {
      res.status(400).json({ error: err.message || "Erro ao criar evento" });
    }
  }

  static async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { title, description, date, location, max_volunteers } = req.body;

      const atualizado = await EventService.atualizar(id, {
        title,
        description,
        date,
        location,
        max_volunteers,
      });

      res.json(atualizado);
    } catch (err) {
      res.status(400).json({ error: err.message || "Erro ao atualizar evento" });
    }
  }

  static async remover(req, res) {
    try {
      const id = parseInt(req.params.id);
      const removido = await EventService.remover(id);
      res.json({ message: "Evento removido", removido });
    } catch (err) {
      res.status(400).json({ error: err.message || "Erro ao remover evento" });
    }
  }
}

module.exports = EventController;
