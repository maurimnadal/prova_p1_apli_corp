const DashboardController = {
  acessar: async (req, res) => {
    try {
      // req.user é preenchido pelo authMiddleware
      const user = req.user;
      res.json({
        message: `Bem-vindo ao dashboard, ${user.name}!`,
        user: {
          id: user.id,
          name: user.name,
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
