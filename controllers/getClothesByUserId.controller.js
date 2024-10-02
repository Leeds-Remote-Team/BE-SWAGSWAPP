const {
  fetchClothesByUserId,
} = require("../models/fetchClothesByUserId.model");

exports.getClothesByUserId = (req, res, next) => {
  const { user_id } = req.params;
  return fetchClothesByUserId(user_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
