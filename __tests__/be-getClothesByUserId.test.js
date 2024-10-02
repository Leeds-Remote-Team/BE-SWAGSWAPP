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
  it("200: Should return an array of clothing items with the expected keys and types for a given user_id", () => {
    return request(app)
      .get("/api/clothes/2")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(Object.keys(body[0])).toHaveLength(8);
        body.forEach((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_id: expect.any(Number),
              user_id: expect.any(Number),
              img_url: expect.any(String),
              top_category: expect.any(String),
              category: expect.any(String),
              tags: expect.any(Object),
              color: expect.any(String),
              created_at: expect.any(String),
            })
          );
        });
      });
  });

  it("404: Should return an error for an endpoint that dosn't exist", () => {
    return request(app)
      .get("/api/hello")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Page not found");
      });
  });
  it("200 - returns the correct clothes with searchText", () => {
    return request(app)
      .get("/api/clothes/2?searchText=brown")
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result).toEqual([
          {
            item_id: 2,
            user_id: 2,
            img_url:
              "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
            top_category: "footwear",
            category: "feet",
            tags: {
              shoes: "shoe",
              last_date_worn: ["date_string"],
              wear_frequency: 10,
            },
            color: "brown",
            created_at: expect.any(String),
          },
        ]);
      });
  });

  it("200 - returns clothes ordered by wear_frequency", () => {
    return request(app)
      .get("/api/clothes/2?sortBy=wear_frequency")
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result.length).toBeGreaterThan(0);
        expect(result).toEqual([
          {
            item_id: 2,
            user_id: 2,
            img_url:
              "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
            created_at: expect.any(String),
            top_category: "footwear",
            category: "feet",
            tags: {
              shoes: "shoe",
              last_date_worn: ["date_string"],
              wear_frequency: 10,
            },
            color: "brown",
          },
          {
            item_id: 3,
            user_id: 2,
            img_url:
              "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
            created_at: expect.any(String),
            top_category: "footwear",
            category: "feet",
            tags: {
              shoes: "shoe",
              last_date_worn: ["date_string"],
              wear_frequency: 0,
            },
            color: "green",
          },
        ]);
      });
  });
});
