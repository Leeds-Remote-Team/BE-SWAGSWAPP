const {
  updateClothesByClothesId,
} = require("../models/updateClothesByClothesId.model");

exports.patchClothesByClothesId = (req, res, next) => {
  const { user_id, item_id } = req.params;
  const { body } = req;

  updateClothesByClothesId(user_id, item_id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
