const { fetchUserByUserId } = require("../models/fetchUserByUserId.model");

exports.getUserByUserId = (req, res, next) => {
  const { user_id } = req.params;
  fetchUserByUserId(user_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
