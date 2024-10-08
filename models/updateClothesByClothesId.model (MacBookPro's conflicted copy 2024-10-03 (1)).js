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

  return db
    .query(
      `
        UPDATE clothes SET 
        img_url = COALESCE($1, img_url), 
        top_category = COALESCE($2, top_category), 
        category = COALESCE($3, category), 
        color = COALESCE($4, color)
        WHERE user_id = $5 AND item_id = $6
        RETURNING *;
        `,
      [img_url, top_category, category, color, user_id, item_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
