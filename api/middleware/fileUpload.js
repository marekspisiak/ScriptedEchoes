// file-upload.js
const multer = require("multer");
const path = require("path");

// Nastavenie úložiska pre multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/"); // Adresár, kde budú uložené súbory
  },
  filename: function (req, file, cb) {
    // Generovanie unikátneho názvu súboru
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Inicializácia a export multer middleware s konfiguráciou úložiska
const upload = multer({ storage: storage });
module.exports = upload;
