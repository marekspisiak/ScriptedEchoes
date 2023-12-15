const jwt = require("jsonwebtoken");
const { createUser } = require("./userService.js");

exports.generateToken = async (auth0Payload) => {
  try {
    const user = await createUser(auth0Payload.sub, auth0Payload.email);

    const newPayload = {
      ...auth0Payload,
      user_id: user.user_id,
    };

    return { token: jwt.sign(newPayload, process.env.YOUR_JWT_SECRET), user };
  } catch (error) {
    throw new Error("Error generating token: " + error.message);
  }
};
