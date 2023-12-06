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
    // Vytiahnutie 'username' z 'req.body'
    const { username } = req.body;

    // Ak chcete pridať dodatočné overenie, môžete tu pridať logiku
    if (!username) {
      return res.status(400).send("Username je povinný");
    }

    // Aktualizujte užívateľa iba s 'username'
    const result = await User.update(
      { username },
      {
        where: { auth0_id: req.params.id },
      }
    );

    // Sequelize 'update' vracia pole, kde prvý element je počet zmenených riadkov
    if (result[0] > 0) {
      res.send("Používateľ bol úspešne aktualizovaný");
    } else {
      res.status(404).send("Používateľ nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Odstránenie používateľa
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: { user_id: req.params.id },
    });
    if (deleteUser) {
      res.status(204).send();
    } else {
      res.status(404).send("Používateľ nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
