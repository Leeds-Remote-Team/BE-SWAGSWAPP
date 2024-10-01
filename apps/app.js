const express = require("express");
const app = express();
const cors = require("cors");
const {
  getWardrobeById,
} = require("../controllers/getWardrobeById.controller");
const { postClothes } = require("../controllers/postClothes.controller");
const { postUser } = require("../controllers/postUser.contoller");

app.use(cors());

app.use(express.json());
app.get("/api/wardrobe/:id", getWardrobeById);
app.post("/api/clothes", postClothes);
app.post("/api/users", postUser);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
