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
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Aktualizácia používateľa
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { user_id: req.params.id },
    });
    if (updatedUser) {
      res.json(updatedUser);
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
