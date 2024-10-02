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

describe("/api/clothes/:user_id", () => {
  it("201, should return an array of all the posted clothes in the database", () => {
    return request(app)
      .post("/api/clothes/2")
      .send({
        img_url:
          "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
        top_category: "clothing",
        category: "polo-shirt",
        tags: { style: "smartwear" },
        color: "white",
      })
      .expect(201)
      .then((response) => {
        expect(response.body.postedClothes).toEqual({
          user_id: 2,
          img_url:
            "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
          top_category: "clothing",
          category: "polo-shirt",
          tags: { style: "smartwear" },
          color: "white",
          item_id: 4,
          created_at: expect.any(String),
        });
      });
  });
  test("404: responds with message when given non-existent path/route.", () => {
    return request(app)
      .post("/api/clotes")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });
  test("400: Bad request, INVALID user ID type", () => {
    return request(app)
      .post("/api/clothes/glue")
      .send({
        img_url:
          "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
        top_category: "clothing",
        category: "polo-shirt",
        tags: { style: "smartwear" },
        color: "white",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(
          "Bad Request: user_id is required and must be a number"
        );
      });
  });
  test("400: Bad request, INVALID image URL", () => {
    return request(app)
      .post("/api/clothes/2")
      .send({
        img_url: 577,
        top_category: "clothing",
        category: "polo-shirt",
        tags: { style: "smartwear" },
        color: "white",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe(
          "Bad Request: img_url is required and must be a string"
        );
      });
  });
  test("400: Bad request, Missing category", () => {
    return request(app)
      .post("/api/clothes/2")
      .send({
        img_url:
          "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
        category: "polo-shirt",
        tags: { style: "smartwear" },
        color: "white",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe(
          "Bad Request: top_category is required and must be a string"
        );
      });
  });
});
