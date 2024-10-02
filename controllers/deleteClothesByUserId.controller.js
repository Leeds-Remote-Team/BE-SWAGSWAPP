const { deletingClothesByUserId } = require("../models/deletingClothes.model");

exports.deleteClothesByUserId = (req, res, next) => {
  const { user_id, item_id } = req.params;
  deletingClothesByUserId(user_id, item_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      next(err);
    });
};
