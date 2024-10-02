const {
  postingClothesByUserId,
} = require("../models/postingClothesByUserId.model");

exports.postClothesByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const { img_url, top_category, category, tags, color } = req.body;

  const clothes = {
    user_id,
    img_url,
    top_category,
    category,
    tags,
    color,
  };

  postingClothesByUserId(clothes)
    .then((postedClothes) => {
      res.status(201).send({ postedClothes });
    })
    .catch((err) => {
      next(err);
    });
};
