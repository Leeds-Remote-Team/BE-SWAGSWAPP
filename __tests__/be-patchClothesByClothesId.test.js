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

describe("PATCH /api/clothes/:user_id/:clothes_id", () => {
  it("200, should returns an updated clothes object in the database when patching a key on tags column", () => {
    const tagsUpdate = {
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
          created_at: expect.any(String),
        });
      });
  });

  it("200, should returns an updated clothes object in the database when patching clothes column", () => {
    const clothesUpdate = {
      img_url:
        "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727443149223.jpg",
      top_category: "t-shirt",
      category: "Upperbody",
      color: "blue",
    };

    return request(app)
      .patch("/api/clothes/2/2")
      .send(clothesUpdate)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          item_id: 2,
          user_id: 2,
          img_url:
            "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727443149223.jpg",
          top_category: "t-shirt",
          category: "Upperbody",
          tags: {
            shoes: "shoe",
            last_date_worn: "date_string",
            wear_frequency: 10,
          },
          color: "blue",
          created_at: expect.any(String),
        });
      });
  });

  it("200, should returns an updated clothes object in the database when patching clothes column", () => {
    const clothesUpdate = {
      img_url:
        "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727443149223.jpg",
      top_category: "t-shirt",
      category: "Upperbody",
      color: "blue",
    };

    return request(app)
      .patch("/api/clothes/2/2")
      .send(clothesUpdate)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          item_id: 2,
          user_id: 2,
          img_url:
            "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727443149223.jpg",
          top_category: "t-shirt",
          category: "Upperbody",
          tags: {
            shoes: "shoe",
            last_date_worn: "date_string",
            wear_frequency: 10,
          },
          color: "blue",
          created_at: expect.any(String),
        });
      });
  });
  it("200, should returns an updated clothes object in the database when patching clothes column", () => {
    const clothesUpdate = {
      img_url:
        "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727443149223.jpg",
      top_category: "t-shirt",
    };

    return request(app)
      .patch("/api/clothes/3/4")
      .send(clothesUpdate)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          item_id: 4,
          user_id: 3,
          img_url:
            "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727443149223.jpg",
          top_category: "t-shirt",
          category: "wrist",
          tags: {
            watch: "watch",
            last_date_worn: "date_string",
            wear_frequency: 0,
          },
          color: "gold",

          created_at: expect.any(String),
        });
      });
  });
});
