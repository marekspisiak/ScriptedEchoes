const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.generateToken = async (auth0Payload) => {
  try {
    // Vyhľadajte užívateľa v lokálnej databáze podľa identifikátora z Auth0 payload
    const user = await User.findOne({ auth0Id: auth0Payload.sub }); // 'sub' je štandardný JWT claim pre identifikátor užívateľa
    if (!user) {
      throw new Error("User not found");
    }

    // Vytvorte nový JWT payload kombinovaním Auth0 payload a lokálneho user_id
    const newPayload = {
      ...auth0Payload,
      user_id: user.user_id, // Pridajte user_id z vašej databázy do payload
    };

    // Generujte a vráťte nový JWT
    return jwt.sign(newPayload, process.env.YOUR_JWT_SECRET); // YOUR_JWT_SECRET by mal byť váš JWT secret kľúč
  } catch (error) {
    throw new Error("Error generating token: " + error.message);
  }
};
