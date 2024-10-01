const db = require("../db/connection");
const pg = require("pg-format");

exports.fetchWardrobeById = (id) => {
  return db
    .query(`SELECT * FROM clothes WHERE clothes.user_id = $1;`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Page not found - invalid Id" });
      }

      // the tags are parsed as a string, we need to convert them back to object

      rows = rows.map((item) => ({
        ...item,
        tags: JSON.parse(item.tags),
      }));

      return rows;
    });
};
