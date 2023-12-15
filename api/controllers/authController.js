const authService = require("../services/authService");

exports.getJwtToken = async (req, res) => {
  try {
    const auth0Payload = req.auth.payload;
    const { token, user } = await authService.generateToken(auth0Payload);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
