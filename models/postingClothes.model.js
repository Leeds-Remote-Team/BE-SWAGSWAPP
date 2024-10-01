const db = require("../db/connection");
const pg = require("pg-format");

exports.postingClothes = (clothes) => {
  return db
    .query(
      `INSERT INTO clothes (user_id, img_url, top_category, category, tags, color ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        clothes.user_id,
        clothes.img_url,
        clothes.top_category,
        clothes.category,
        clothes.tags,
        clothes.color,
      ]
    )
    .then((result) => {
      console.log(result, "<--- result from the model");
      return result.body;
    });
};
