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

describe("/api/users/:user_id", () => {
  it("200: Should return a user by user_id", () => {
    return request(app)
      .get("/api/users/2")
      .expect(200)
      .then(({ body }) => {
        expect(Object.keys(body)).toHaveLength(4);
        expect.objectContaining({
          user_id: expect.any(Number),
          username: expect.any(String),
          firstname: expect.any(String),
          lastname: expect.any(String),
        });
      });
  });

  it("404: Should return an error for an user id that doesn't exist", () => {
    return request(app)
      .get("/api/users/10000000")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Page not found");
      });
  });
  it("400: Should return an error for an invalid user id", () => {
    return request(app)
      .get("/api/users/peter")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid Id");
      });
  });
});
