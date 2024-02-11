// services/imageService.js

const fs = require("fs");

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  const baseUrl = "http://localhost:3001";
  return `${baseUrl}/${imagePath}`;
};

const deleteOldImage = (oldImagePath) => {
  const oldImageFilePath = oldImagePath.replace("http://localhost:3001/", "");
  fs.unlink(oldImageFilePath, (err) => {
    if (err) console.error("Chyba pri odstraňovaní obrázka", err);
  });
};

module.exports = {
  getFullImageUrl,
  deleteOldImage,
};
