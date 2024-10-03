const db = require("../db/connection");
const pg = require("pg-format");

exports.fetchClothesByUserIdClothesId = (item_id, user_id) => {
  return db
    .query(
      `SELECT * FROM clothes WHERE clothes.item_id = $1 AND clothes.user_id = $2;`,
      [item_id, user_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Page not found - invalid Id" });
      }

      return rows;
    });
};
