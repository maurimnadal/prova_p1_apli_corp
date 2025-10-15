/**
 * @swagger
 * tags:
 *   name: Volunteers
 *   description: Rotas para gerenciamento de voluntários
 *
 * /volunteers:
 *   get:
 *     summary: Lista todos os voluntários
 *     tags: [Volunteers]
 *     responses:
 *       200:
 *         description: Lista de voluntários retornada com sucesso
 *       500:
 *         description: Erro interno ao listar voluntários
 *
 *   post:
 *     summary: Cria um novo voluntário
 *     tags: [Volunteers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               phone:
 *                 type: string
 *                 example: "(11) 99999-9999"
 *     responses:
 *       201:
 *         description: Voluntário criado com sucesso
 *       400:
 *         description: Erro ao criar voluntário
 *
 * /volunteers/{id}:
 *   get:
 *     summary: Busca um voluntário pelo ID
 *     tags: [Volunteers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do voluntário
 *     responses:
 *       200:
 *         description: Voluntário encontrado
 *       404:
 *         description: Voluntário não encontrado
 *
 *   put:
 *     summary: Atualiza um voluntário existente
 *     tags: [Volunteers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do voluntário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Oliveira
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               phone:
 *                 type: string
 *                 example: "(21) 98888-7777"
 *     responses:
 *       200:
 *         description: Voluntário atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar voluntário
 *
 *   delete:
 *     summary: Remove um voluntário
 *     tags: [Volunteers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do voluntário
 *     responses:
 *       200:
 *         description: Voluntário removido com sucesso
 *       404:
 *         description: Voluntário não encontrado
 */

const VolunteerService = require("../services/volunteer.service");

class VolunteerController {
  static async listar(req, res) {
    try {
      const volunteers = await VolunteerService.listar();
      res.json(volunteers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const volunteer = await VolunteerService.buscarPorId(id);
      res.json(volunteer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async criar(req, res) {
    try {
      const newVolunteer = await VolunteerService.criar(req.body);
      res.status(201).json(newVolunteer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const id = req.params.id;
      const usuario = req.user; // vem do JWT
      const data = req.body;

      const voluntarioAtualizado = await VolunteerService.atualizar(id, data, usuario);
      res.json(voluntarioAtualizado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }



  static async remover(req, res) {
    try {
      const id = parseInt(req.params.id);
      const volunteer = await VolunteerService.remover(id);
      res.json({ message: "Voluntário removido", volunteer });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = VolunteerController;
