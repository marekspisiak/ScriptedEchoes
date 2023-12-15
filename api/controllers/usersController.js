const User = require("../models/user.js");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Používateľ nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUserProfileById = async (req, res) => {
  try {
    const auth0Id = req.params.id;
    const user = await User.findOne({
      where: { auth0_id: auth0Id },
      attributes: ["username", "email", "user_id"],
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Užívateľ nebol nájdený");
    }
  } catch (error) {
    console.error("Chyba pri získavaní užívateľa: ", error);
    res.status(500).send("Interná chyba servera");
  }
};

// exports.getUserProfile = async (req, res) => {
//   //console.log(req.auth.payload);
//   //res.status(404).send("Užívateľ nebol nájdený");
//   return;
//   try {
//     const auth0Id = req.params.id;
//     const user = await User.findOne({
//       where: { auth0_id: auth0Id },
//       attributes: ["username", "email", "user_id"],
//     });

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).send("Užívateľ nebol nájdený");
//     }
//   } catch (error) {
//     console.error("Chyba pri získavaní užívateľa: ", error);
//     res.status(500).send("Interná chyba servera");
//   }
// };

// exports.createUser = async (req, res) => {
//   try {
//     const existingUser = await User.findOne({
//       where: { auth0_id: req.body.auth0_id },
//     });

//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "Užívateľ s daným Auth0 ID už existuje." });
//     }

//     const newUser = await User.create(req.body);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { username } = req.body;

//     const validUsernameRegex = /^[a-zA-Z0-9_-]+$/;

//     if (!username) {
//       return res.status(400).send("Username je povinný");
//     }

//     if (!validUsernameRegex.test(username)) {
//       return res.status(400).send("Neplatný formát užívateľského mena");
//     }

//     const result = await User.update(
//       { username },
//       { where: { auth0_id: req.params.id } }
//     );

//     if (result[0] > 0) {
//       res.send("Užívateľ bol úspešne aktualizovaný.");
//     } else {
//       res.status(404).send("Užívateľ nebol nájdený alebo žiadna zmena.");
//     }
//   } catch (error) {
//     console.error("Chyba pri aktualizácii užívateľa:", error);
//     res.status(500).send("Interná chyba servera");
//   }
// };

exports.changeUsername = async (req, res) => {
  try {
    const { username } = req.body;

    const validUsernameRegex = /^[a-zA-Z0-9_-]+$/;

    if (!username) {
      return res.status(400).send("Username je povinný");
    }

    if (!validUsernameRegex.test(username)) {
      return res.status(400).send("Neplatný formát užívateľského mena");
    }

    const result = await User.update(
      { username },
      { where: { user_id: req.auth.payload.user_id } }
    );

    if (result[0] > 0) {
      res.send("Užívateľ bol úspešne aktualizovaný.");
    } else {
      res.status(404).send("Užívateľ nebol nájdený alebo žiadna zmena.");
    }
  } catch (error) {
    console.error("Chyba pri aktualizácii užívateľa:", error);
    res.status(500).send("Interná chyba servera");
  }
};
