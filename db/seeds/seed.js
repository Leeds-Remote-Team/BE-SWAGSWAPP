const format = require("pg-format");
const db = require("../connection");

const seed = ({ userData, clothesData }) => {
  return db
    .query(`DROP TABLE IF EXISTS clothes;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      const usersTablePromise = db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(20) NOT NULL,
          password VARCHAR(16) NOT NULL
        );`);

      const clothesTablePromise = db.query(`
        CREATE TABLE clothes (
          item_id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(user_id),
          img_url VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          top_category VARCHAR NOT NULL,
          category VARCHAR NOT NULL,
          tags VARCHAR,
          color VARCHAR NOT NULL
        );`);

      return Promise.all([usersTablePromise, clothesTablePromise]);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (username, password) VALUES %L;",
        userData.map(({ username, password }) => [username, password])
      );
      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      const insertClothesQueryStr = format(
        "INSERT INTO clothes (user_id, img_url, top_category, category, tags, color) VALUES %L;",
        clothesData.map(
          ({ user_id, img_url, top_category, category, tags, color }) => [
            user_id,
            img_url,
            top_category,
            category,
            tags,
            color,
          ]
        )
      );

      return db.query(insertClothesQueryStr);
    });
};

module.exports = seed;
