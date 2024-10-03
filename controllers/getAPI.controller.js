const { selectAPI } = require("../models/selectAPI.model");

exports.getAPI = (req, res, next) => {
  selectAPI()
    .then((data) => {
      const api = JSON.parse(data);
      res.status(200).send({ api });
    })
    .catch((err) => {
      next(err);
    });
};
