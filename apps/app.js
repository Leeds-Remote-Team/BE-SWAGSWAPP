const express = require("express");
const app = express();
const cors = require("cors");
const {
  getClothesByUserId,
} = require("../controllers/getClothesByUserId.controller");
const {
  postClothesByUserId,
} = require("../controllers/postClothesByUserId.controller");

const { postUser } = require("../controllers/postUser.contoller");

const {
  getUserByUserId,
} = require("../controllers/getUserByUserId.controller");

const {
  patchClothesByClothesId,
} = require("../controllers/patchClothesByClothesId.controller");

app.use(cors());

app.use(express.json());

app.get("/api/clothes/:user_id", getClothesByUserId);

app.post("/api/clothes/:user_id", postClothesByUserId);

app.post("/api/users", postUser);

app.get("/api/users/:user_id", getUserByUserId);

app.patch("/api/clothes/:user_id/:clothes_id", patchClothesByClothesId);

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
