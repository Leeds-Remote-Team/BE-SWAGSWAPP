const db = require("../db/connection");
const pg = require("pg-format");

exports.addUser = (
  username,
  password,
  first_name,
  last_name,
  user_preferences
) => {
  console.log(username, password, "<-- Username, password");
  return db
    .query(
      `INSERT INTO users (username, password, first_name, last_name, user_preferences) VALUES {$1, $2, $3, $4, $5} RETURNING *`,
      [username, password, first_name, last_name, user_preferences]
    )
    .then(({ rows }) => {
      console.log(rows, "<-- returning rows");
      return rows[0];
    });
};
