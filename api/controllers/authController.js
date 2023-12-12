const authService = require("../services/authService");

exports.getJwtToken = async (req, res) => {
  try {
    const auth0Payload = req.auth.payload; // Predpokladajme, že Auth0 token je poslaný v hlavičke
    const token = await authService.generateToken(auth0Payload);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
