const db = require("../db/connection");
const pg = require("pg-format");

exports.fetchClothesByUserId = (user_id, searchText, sortBy, order) => {
  const validSorting = ["last_date_worn", "wear_frequency", "item_id"];
  const validOrders = ["asc", "desc"];

  if (!validSorting.includes(sortBy)) {
    return Promise.reject({ msg: `Cannot sort by '${sortBy}'` });
  }

  if (!validOrders.includes(order)) {
    return Promise.reject({ msg: `Cannot order by '${order}'` });
  }

  let queryStr = `SELECT * FROM clothes WHERE clothes.user_id = $1`;
  const queryValues = [user_id];

  if (searchText) {
    queryValues.push(`%${searchText}%`);

    queryStr += ` AND (clothes.top_category ILIKE $${queryValues.length} OR clothes.category ILIKE $${queryValues.length} OR clothes.tags->>'sleeves' ILIKE $${queryValues.length} OR clothes.tags->>'style' ILIKE $${queryValues.length} OR clothes.color ILIKE $${queryValues.length})`;
  }

  if (sortBy === "last_date_worn") {
    queryStr += ` ORDER BY (tags->>'${sortBy}')::date ${order};`;
  }
  if (sortBy === "item_id") {
    queryStr += ` ORDER BY clothes.item_id ${order};`;
  }
  if (sortBy === "wear_frequency") {
    queryStr += ` ORDER BY (tags->>'${sortBy}')::int ${order};`;
  } else {
    queryStr += `;`;
  }
  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `Sorry, you don't have any clothes. Try searching for something else!`,
      });
    }
    return rows;
  });
};
