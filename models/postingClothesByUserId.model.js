const db = require("../db/connection");
const pg = require("pg-format");

exports.postingClothesByUserId = (clothes) => {
  const { user_id, img_url, top_category, category, tags, color } = clothes;
  const num_user_id = Number(user_id);

  if (!num_user_id || typeof num_user_id !== "number") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: user_id is required and must be a number",
    });
  }
  if (!img_url || typeof img_url !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: img_url is required and must be a string",
    });
  }
  if (!top_category || typeof top_category !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: top_category is required and must be a string",
    });
  }
  if (!category || typeof category !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: category is required and must be a string",
    });
  }
  if (!tags || typeof tags !== "object") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: tags is required and must be a object",
    });
  }
  if (!color || typeof color !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: color is required and must be a string",
    });
  }
  return db
    .query(
      `INSERT INTO clothes (user_id, img_url, top_category, category, tags, color ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        num_user_id,
        clothes.img_url,
        clothes.top_category,
        clothes.category,
        clothes.tags,
        clothes.color,
      ]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      return rows[0];
    })
    .catch((err) => {
      next(err);
    });
};
