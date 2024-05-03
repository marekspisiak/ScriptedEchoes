const User = require("../models/user.js");

exports.createUser = async (auth0Id, email) => {
  try {
    const existingUser = await User.findOne({
      where: { auth0_id: auth0Id },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await User.create({ auth0_id: auth0Id, email: email });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};
