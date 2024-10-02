const db = require("../db/connection");

exports.updateClothesByClothesId = (user_id, clothes_id, body) => {
  const { last_date_worn, wear_frequency } = body;
  return db
    .query(
      `
    UPDATE clothes SET tags = jsonb_set(tags, '{last_date_worn}', $1::jsonb, true), tags = jsonb_set(tags, '{wear_frequency}', $2::jsonb, true) WHERE user_id = $3 AND item_id = $4 RETURNING * ;`,

      [last_date_worn, wear_frequency, user_id, clothes_id]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows[0];
    });
};

// UPDATE clothes SET tags = tags || jsonb_build_object ('last_date_worn', tags->>'last_date_worn' || $1) WHERE user_id = $2 AND item_id = $3 RETURNING * `
