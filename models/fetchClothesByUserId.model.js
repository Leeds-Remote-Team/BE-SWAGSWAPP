const db = require("../db/connection");
const pg = require("pg-format");

exports.fetchClothesByUserId = (user_id, searchText, sortBy, order) => {
  const validSorting = ["last_date_worn", "wear_frequency"];
  const validOrders = ["asc", "desc"];

  if (!validSorting.includes(sortBy)) {
    return Promise.reject({ msg: "Cannot sort by this" });
  }

  if (!validOrders.includes(order)) {
    return Promise.reject({ msg: "Cannot order by this" });
  }

  let queryStr = `SELECT * FROM clothes WHERE clothes.user_id = $1`;
  const queryValues = [user_id];

  if (searchText) {
    queryValues.push(`%${searchText}%`);

    queryStr += ` AND (clothes.top_category ILIKE $${queryValues.length} OR clothes.category ILIKE $${queryValues.length} OR clothes.tags->>'sleeves' ILIKE $${queryValues.length} OR clothes.tags->>'style' ILIKE $${queryValues.length} OR clothes.color ILIKE $${queryValues.length})`;

    //can leave as ${2} instead of $${queryValues.length} but id we added more queries into queryvalues, this would break the code. $${queryValues.length} is dynamic.
  }

  //SQL injection below?? Dont know how to get around this
  queryStr += ` ORDER BY clothes.tags->>'${sortBy}' ${order};`;

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        msg: `Sorry, you don't have any clothes. Try searching for something else!`,
      });
    }
    return rows;
  });
};
