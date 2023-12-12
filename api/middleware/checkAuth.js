const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken) {
      throw new Error("Token could not be decoded");
    }

    const verifiedPayload = jwt.verify(token, process.env.YOUR_JWT_SECRET);

    req.auth = {
      payload: verifiedPayload,
      header: decodedToken.header,
      token: token,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
};

module.exports = checkAuth;
