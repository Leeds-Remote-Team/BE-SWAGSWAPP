const format = require("pg-format");
const db = require("../connection");

const seed = ({ userData, clothesData }) => {
  return (
    db
      .query(`DROP TABLE IF EXISTS clothes;`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`);
      })
      .then(() => {
        return db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(20) NOT NULL,
          password VARCHAR(16) NOT NULL,
          first_name VARCHAR(20) NOT NULL,
          last_name VARCHAR(20) NOT NULL,
          user_preferences JSON
        );`);
      })
      .then(() => {
        return db.query(`
        CREATE TABLE clothes (
          item_id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(user_id),
          img_url VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          top_category VARCHAR NOT NULL,
          category VARCHAR NOT NULL,
          tags JSON,
          color VARCHAR NOT NULL
        );`);
      })

      // return Promise.all([usersTablePromise, clothesTablePromise]);

      .then(() => {
        const insertUsersQueryStr = format(
          "INSERT INTO users (username, password, first_name, last_name, user_preferences) VALUES %L;",
          userData.map(
            ({
              username,
              password,
              first_name,
              last_name,
              user_preferences,
            }) => [username, password, first_name, last_name, user_preferences]
          )
        );
        // const userPromise = db.query(insertUsersQueryStr);
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
        // return Promise.all([userPromise, clothesPromise]);
      })
  );
};

module.exports = seed;
