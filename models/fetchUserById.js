const db = require("../db/connection");

exports.fetchUserById = (user_id) => {
  return db
    .query(
      `SELECT username, user_id, first_name, last_name FROM users WHERE users.user_id = $1;`,
      [user_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Page Not Found" });
      }
      return rows[0];
    });
};
