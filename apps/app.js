const express = require("express");
const app = express();
const cors = require("cors");
const {
  getWardrobeById,
} = require("../controllers/getWardrobeById.controller");
const { postClothes } = require("../controllers/postClothes.controller");

app.use(cors());

app.use(express.json());
app.get("/api/wardrobe/:id", getWardrobeById);
app.post("/api/clothes", postClothes);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
});

module.exports = app;
