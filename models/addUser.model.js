const db = require("../db/connection");

exports.addUser = (
  username,
  password,
  first_name,
  last_name,
  user_preferences
) => {
  const regex = /^[A-Za-z0-9]+$/;
  if(!username || !password || !first_name || !last_name){
    return Promise.reject({
      status: 400, 
      msg: "Must contain the required field"
    })
  }

  if(!regex.test(username) || !regex.test(password) || !regex.test(first_name) || !regex.test(last_name)){
    return Promise.reject({
      status: 400, 
      msg: "Invalid user data"
    })
  }

  return db
    .query(
      `INSERT INTO users (username, password, first_name, last_name, user_preferences) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [username, password, first_name, last_name, user_preferences]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
