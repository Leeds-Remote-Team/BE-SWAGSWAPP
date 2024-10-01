const express = require("express");
const app = express();
const cors = require("cors");
const {
  getWardrobeById,
} = require("../controllers/getWardrobeById.controller");

app.use(cors());

app.use(express.json());
app.get("/api/wardrobe/:id", getWardrobeById);

app.all("/*", (req, res, next) => {
  console.log("reached final error handler");
  res.status(404).send({ msg: "Page not found" });
});

module.exports = app;
