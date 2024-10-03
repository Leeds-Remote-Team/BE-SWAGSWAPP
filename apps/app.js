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

const {
  deleteClothesByUserId,
} = require("../controllers/deleteClothesByUserId.controller");

const {
  getClothesByUserIdClothesId,
} = require("../controllers/getClothesByUserIdClothesId.controller");

app.use(cors());

app.use(express.json());

app.get("/api/clothes/:user_id", getClothesByUserId);
app.get("/api/clothes/:user_id/:item_id", getClothesByUserIdClothesId);
app.post("/api/clothes/:user_id", postClothesByUserId);
app.patch("/api/clothes/:user_id/:item_id", patchClothesByClothesId);
app.delete("/api/clothes/:user_id/:item_id", deleteClothesByUserId);

app.get("/api/users/:user_id", getUserByUserId);
app.post("/api/users", postUser);

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
