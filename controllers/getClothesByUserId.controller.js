const {
  fetchClothesByUserId,
} = require("../models/fetchClothesByUserId.model");

exports.getClothesByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const {
    searchText = "",
    sortBy = "wear_frequency",
    order = "desc",
  } = req.query;

  return fetchClothesByUserId(user_id, searchText, sortBy, order)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
