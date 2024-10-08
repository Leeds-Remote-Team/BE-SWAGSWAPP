const db = require("../db/connection");

exports.updateClothesByClothesId = (user_id, item_id, body) => {
  const {
    img_url,
    top_category,
    category,
    color,
    last_date_worn,
    wear_frequency,
  } = body;

  if (last_date_worn || wear_frequency) {
    return db
      .query(
        `
    UPDATE clothes 
    SET 
      tags = jsonb_set(
                jsonb_set(tags, '{last_date_worn}', to_jsonb($1::text), true), 
                '{wear_frequency}', to_jsonb($2::int), true
             )
    WHERE user_id = $3 AND item_id = $4 
    RETURNING *;
    `,
        [last_date_worn, wear_frequency, user_id, item_id]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }

  console.log(
    img_url,
    top_category,
    category,
    color,
    last_date_worn,
    wear_frequency
  );

  const queryString = `UPDATE clothes SET `;
  if (img_url) {
    queryString += `img_url = ${img_url}`;
    console.log(queryString);
  }
  if (top_category) {
    queryString += `, top_category = ${top_category}`;
    console.log(queryString);
  }
  if (category) {
    queryString += `, category = ${category}`;
    console.log(queryString);
  }
  if (color) {
    queryString += `, color = ${color}`;
    console.log(queryString);
  }
  return db
    .query(queryString + ` WHERE user_id = $1 AND item_id = $2 RETURNING *;`, [
      user_id,
      item_id,
    ])
    .then(({ rows }) => {
      console.log(rows);
      return rows[0];
    })
    .catch((err) => console.log(err));
};
