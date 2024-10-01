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

describe("/api/clothes", () => {
  it("201, should return an array of all the posted clothes in the database", () => {
    return request(app)
      .post("/api/clothes")

      .send({
        user_id: 3,
        img_url:
          "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
        top_category: "clothing",
        category: "polo-shirt",
        tags: { style: "smartwear" },
        color: "white",
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          user_id: 3,
          img_url:
            "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
          top_category: "clothing",
          category: "polo-shirt",
          tags: { style: "smartwear" },
          color: "white",
        });
      });
  });
});
