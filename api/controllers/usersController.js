const User = require("../models/user.js");

// Získanie všetkých používateľov
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Získanie konkrétneho používateľa podľa ID
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
      attributes: ["username", "email", "user_id"], // Vyberá iba username a email
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

// Vytvorenie nového používateľa
exports.createUser = async (req, res) => {
  try {
    // Skontrolujte, či už existuje užívateľ s poskytnutým auth0_id
    const existingUser = await User.findOne({
      where: { auth0_id: req.body.auth0_id },
    });

    if (existingUser) {
      // Ak užívateľ existuje, vráťte príslušnú odpoveď
      return res
        .status(409)
        .json({ message: "Užívateľ s daným Auth0 ID už existuje." });
    }

    // Ak užívateľ neexistuje, vytvorte nového užívateľa
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// Aktualizácia používateľa
exports.updateUser = async (req, res) => {
  try {
    const { username } = req.body;

    // Regulárny výraz pre kontrolu platnosti username
    const validUsernameRegex = /^[a-zA-Z0-9_-]+$/;

    // Skontrolujte, či bol username poskytnutý
    if (!username) {
      return res.status(400).send("Username je povinný");
    }

    // Skontrolujte, či username spĺňa kritériá platnosti
    if (!validUsernameRegex.test(username)) {
      return res.status(400).send("Neplatný formát užívateľského mena");
    }

    // Aktualizujte užívateľa iba s 'username'
    const result = await User.update(
      { username },
      { where: { auth0_id: req.params.id } }
    );

    // Odpoveď v prípade úspechu
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
