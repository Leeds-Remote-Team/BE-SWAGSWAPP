const { fetchUserById } = require("../models/fetchUserById");

exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  fetchUserById(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
