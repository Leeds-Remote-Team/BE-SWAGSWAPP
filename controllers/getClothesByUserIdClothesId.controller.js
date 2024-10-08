const {
  fetchClothesByUserIdClothesId,
} = require("../models/fetchClothesByUserIdClothesId.model");

exports.getClothesByUserIdClothesId = (req, res, next) => {
  const { user_id, item_id } = req.params;
  return fetchClothesByUserIdClothesId(user_id, item_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
