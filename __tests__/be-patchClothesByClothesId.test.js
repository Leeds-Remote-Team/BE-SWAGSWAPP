const request = require("supertest");
const app = require("../apps/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const { userData, clothesData } = require("../db/data/test-data/index.js");

beforeAll(() => {
  return seed({ userData, clothesData });
});
afterAll(() => {
  return db.end();
});

describe.only("PATCH /api/clothes/:user_id/:clothes_id", () => {
  it("200, should returns an updated clothes object in the database when patching a key on tags column", () => {
    const tagsUpdate = {
      //   sleeves: "short-sleeve",
      //   style: "t-shirt",
      last_date_worn: "021024",
      wear_frequency: 1,
    };

    return request(app)
      .patch("/api/clothes/1/1")
      .send(tagsUpdate)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          item_id: 1,
          user_id: 1,
          img_url:
            "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
          top_category: "clothing",
          category: "t-shirt",
          tags: {
            sleeves: "short-sleeve",
            style: "t-shirt",
            last_date_worn: "021024",
            wear_frequency: 1,
          },
          color: "red",
        });
      });
  });
});
