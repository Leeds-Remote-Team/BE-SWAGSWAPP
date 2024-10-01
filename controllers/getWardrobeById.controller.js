const { fetchWardrobeById } = require("../models/fetchWardrobeById.model");

exports.getWardrobeById = (req, res, next) => {
  const { id } = req.params;
  return fetchWardrobeById(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
