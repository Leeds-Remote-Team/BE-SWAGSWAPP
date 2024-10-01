const { fetchWardrobeById } = require("../models/fetchWardrobeById.model");

exports.getWardrobeById = (req, res, next) => {
  const { id } = req.params;
  console.log("error in controller", id);
  return fetchWardrobeById(id)
    .then((data) => {
      res.status(200).send(data);
      console.log(data);
    })
    .catch((err) => {
      next(err);
    });
};
