const db = require("../db/connection");
const pg = require("pg-format");

exports.fetchClothesByUserId = (user_id) => {
  return db
    .query(`SELECT * FROM clothes WHERE clothes.user_id = $1;`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Page not found - invalid Id" });
      }

      return rows;
    });
};
