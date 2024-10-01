const express = require("express");
const app = express();
const cors = require("cors");
const {
  getWardrobeById,
} = require("../controllers/getWardrobeById.controller");
const { postClothes } = require("../controllers/postClothes.controller");
const { getUserById } = require("../controllers/getUserById");
app.use(cors());

app.use(express.json());

app.get("/api/wardrobe/:id", getWardrobeById);

app.post("/api/clothes", postClothes);

app.get("/api/users/:id", getUserById);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Id" });
  } else if (err.msg === "Page Not Found")
    res.status(404).send({ msg: "Page not found" });
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
});

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
});

module.exports = app;
