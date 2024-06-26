const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const sequelize = require("./database");
require("./models/associateModels");

const jwtCheck = auth({
  audience: "localhost:3001",
  issuerBaseURL: "https://dev-lvx04gpir514yisr.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

module.exports = jwtCheck;

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", commentRoutes);
app.use("/", authRoutes);
app.use("/", testRoutes);
app.use("/", categoryRoutes);
app.use("/storage", express.static("storage"));

app.use("/", (req, res) => {
  res.send("Welcome to the ScriptedEchoes API!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
