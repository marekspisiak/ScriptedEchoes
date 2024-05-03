const User = require("../models/user.js");
const {
  getFullImageUrl,
  deleteOldImage,
} = require("../services/imageService.js");

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
    const permissions = req.auth.payload;
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

const fs = require("fs");

exports.changeProfile = async (req, res) => {
  try {
    const { username, image } = req.body;
    const userId = req.auth.payload.user_id;
    const user = await User.findOne({ where: { user_id: userId } });

    const removeImage = image === "REMOVE_IMAGE";

    if (!user) {
      return res.status(404).send("Užívateľ nebol nájdený");
    }

    let imageUrl = user.image;
    let oldImagePath = null;

    if (req.file) {
      imageUrl = getFullImageUrl(req.file.path);
      oldImagePath = user.image;
    } else if (removeImage) {
      oldImagePath = user.image;
      imageUrl = null;
    }

    await user.update({
      username,
      image: imageUrl,
    });

    if (oldImagePath) {
      deleteOldImage(oldImagePath);
    }

    res.json({
      message: "Užívateľ bol úspešne aktualizovaný.",
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Chyba pri aktualizácii užívateľa:", error);
    res.status(500).send("Interná chyba servera");
  }
};
