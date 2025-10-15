/**
 * Dashboard Controller
 * Returns basic information about the authenticated user.
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
