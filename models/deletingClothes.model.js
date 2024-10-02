const db = require("../db/connection");

exports.deletingClothesByUserId = (user_id, item_id) => {
  if (isNaN(Number(user_id || item_id))) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      `DELETE FROM clothes WHERE clothes.user_id = $1 AND clothes.item_id = $2 RETURNING *;`,
      [user_id, item_id]
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Page not found" });
      }
      return "Item Successfully deleted";
    });
};
