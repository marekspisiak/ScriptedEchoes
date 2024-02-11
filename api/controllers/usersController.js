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
    const { username } = req.body;
    const userId = req.auth.payload.user_id;
    const user = await User.findOne({ where: { user_id: userId } });

    if (!user) {
      return res.status(404).send("Užívateľ nebol nájdený");
    }

    // Získanie informácií o obrázku
    const imagePath = req.file ? req.file.path : user.image; // Použitie existujúcej cesty k obrázku, ak nie je nahraný nový
    const imageUrl = imagePath ? `http://localhost:3001/${imagePath}` : null;

    const oldImagePath = user.image;

    // Aktualizácia užívateľa v databáze
    await user.update({
      username,
      image: imageUrl, // Aktualizácia URL obrázka
    });

    if (oldImagePath && imageUrl) {
      const oldImageFilePath = oldImagePath.replace(
        "http://localhost:3001/",
        ""
      );
      fs.unlink(oldImageFilePath, (err) => {
        if (err) console.error("Chyba pri odstraňovaní obrázka", err);
      });
    }

    res.json({
      message: "Užívateľ bol úspešne aktualizovaný.",
      imageUrl: imageUrl, // Vráti URL aktualizovaného obrázka
    });
  } catch (error) {
    console.error("Chyba pri aktualizácii užívateľa:", error);
    res.status(500).send("Interná chyba servera");
  }
};
