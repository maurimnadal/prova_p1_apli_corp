/**
 * Controller de autenticação
 */
const authService = require("../services/auth.service");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email and password required" });
    const result = await authService.authenticate({ email, password });
    if (!result)
      return res.status(401).json({ message: "Invalid credentials" });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
