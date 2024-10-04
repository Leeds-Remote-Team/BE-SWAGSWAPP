const request = require("supertest");
const app = require("../apps/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const { userData, clothesData } = require("../db/data/test-data/index.js");
require("jest-sorted");

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

  it("400: Should return an error for an endpoint that dosn't exist", () => {
    return request(app)
      .get("/api/hello")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Page not found");
      });
  });
  it("200 - returns the correct clothes with searchText", () => {
    return request(app)
      .get("/api/clothes/1?searchText=red")
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result).toEqual([
          {
            user_id: 1,
            created_at: expect.any(String),
            item_id: expect.any(Number),
            img_url:
              "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
            top_category: "clothing",
            category: "t-shirt",
            tags: {
              sleeves: "short-sleeve",
              style: "t-shirt",
              last_date_worn: "date_string",
              wear_frequency: 0,
            },
            color: "red",
          },
        ]);
      });
  });
  it("404 - returns the correct error when searchText does ot exist in any of the data", () => {
    return request(app)
      .get("/api/clothes/1?searchText=doesntexist")
      .expect(404)
      .then((response) => {
        const result = response.body.msg;
        expect(result).toEqual(
          "Sorry, you don't have any clothes. Try searching for something else!"
        );
      });
  }, 10000);
  it("200 - returns all the user's clothes when searchText is 'a'", () => {
    return request(app)
      .get("/api/clothes/2?searchText=a")
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result).toEqual([
          {
            created_at: expect.any(String),
            item_id: expect.any(Number),
            user_id: 2,
            img_url:
              "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
            top_category: "footwear",
            category: "feet",
            tags: {
              shoes: "shoe",
              last_date_worn: "date_string",
              wear_frequency: 10,
            },
            color: "brown",
          },
          {
            created_at: expect.any(String),
            item_id: expect.any(Number),
            user_id: 2,
            img_url:
              "https:// uhqkbcxmjnqjhwbmupzq.supabase.co/storage/v1/object/public/ClothingImages/public/1727434604611.jpg",
            top_category: "footwear",
            category: "feet",
            tags: {
              shoes: "shoe",
              last_date_worn: "date_string",
              wear_frequency: 0,
            },
            color: "green",
          },
        ]);
      });
  });

  it("200 - returns clothes ordered by wear_frequency in descending order", () => {
    return request(app)
      .get("/api/clothes/3?sortBy=wear_frequency&order=desc")
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result.length).toBe(40);
        expect(result[0].tags.wear_frequency).toBe(189);
        expect(result[39].tags.wear_frequency).toBe(0);
      });
  });
  it("200 - returns clothes ordered by wear_frequency in ascending order", () => {
    return request(app)
      .get("/api/clothes/3?sortBy=wear_frequency&order=asc")
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result.length).toBe(40);
        expect(result[0].tags.wear_frequency).toBe(0);
        expect(result[39].tags.wear_frequency).toBe(189);
      });
  });
  it("200 - returns clothes ordered by newest to oldest", () => {
    return request(app)
      .get("/api/clothes/3?sortBy=wear_frequency&order=desc")
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result.length).toBe(40);
        expect(result[0].tags.last_date_worn).toBe("2024-09-20");
        expect(result[39].tags.last_date_worn).toBe("date_string");
      });
  });
  it("200 - returns clothes ordered by oldest to newest", () => {
    return request(app)
      .get("/api/clothes/3?sortBy=wear_frequency&order=asc")
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result.length).toBe(40);
        expect(result[0].tags.last_date_worn).toBe("date_string");
        expect(result[39].tags.last_date_worn).toBe("2024-09-20");
      });
  });
  it("200 - allows sorting clothes by a valid column (wear_frequency)", () => {
    return request(app)
      .get("/api/clothes/3?sortBy=wear_frequency&order=desc")
      .expect(200)
      .then((res) => {
        const result = res.body;
        const wearCount = result.map((item) => {
          return item.tags.wear_frequency;
        });
        expect(wearCount).toBeSorted({
          descending: true,
        });
      });
  });
});
