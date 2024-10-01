const { postingClothes } = require("../models/postingClothes.model");

exports.postClothes = (req, res, next) => {
  const { user_id, img_url, top_category, category, tags, color } = req.body;

  const clothes = {
    user_id,
    img_url,
    top_category,
    category,
    tags,
    color,
  };
  postingClothes()
    .then(() => {
      return postingClothes(clothes);
    })
    .then((postedClothes) => {
      console.log(postedClothes);
      res.status(201).send({ postedClothes });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
