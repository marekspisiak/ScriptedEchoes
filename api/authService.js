const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.generateToken = async (auth0Payload) => {
  try {
    const user = await User.findOne({ auth0Id: auth0Payload.sub });
    if (!user) {
      throw new Error("User not found");
    }

    const newPayload = {
      ...auth0Payload,
      user_id: user.user_id,
    };

    console.log(process.env.YOUR_JWT_SECRET);

    return jwt.sign(newPayload, process.env.YOUR_JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    throw new Error("Error generating token: " + error.message);
  }
};
