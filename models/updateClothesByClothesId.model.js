const db = require("../db/connection");

exports.updateClothesByClothesId = (user_id, item_id, body) => {
  const { last_date_worn, wear_frequency } = body;

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
};
