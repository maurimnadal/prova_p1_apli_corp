/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard que contém resumo das informações dos eventos
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Retorna informações básicas do usuário autenticado
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de boas-vindas
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                       nullable: true
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Usuário não autenticado ou token inválido
 *       500:
 *         description: Erro interno ao acessar o dashboard
 */


const DashboardController = {
  acessar: async (req, res) => {
    try {
      const user = req.user || {};
      res.json({
        message: `Bem-vindo ao dashboard, ${user.name || user.email}!`,
        user: {
          id: user.id,
          name: user.name || null,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ error: "Erro ao acessar dashboard" });
    }
  },
};

module.exports = DashboardController;
