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

describe("/api/clothes/:user_id/:item_id", () => {
  it("DELETE - should delete a clothes item by the user_id specified and item_id specified, returning a confirmation message", () => {
    return request(app)
      .delete("/api/clothes/1/1")
      .expect(200)
      .then((response) => {
        expect(response.text).toBe("Item Successfully deleted");
      });
  });

  it("should respond with a 404 status code when directed to a non existent route", () => {
    return request(app)
      .delete("/api/clothes/3453453/23423423")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });
  it("should respond with a 400 if the id's passed through are invalid types", () => {
    return request(app)
      .delete("/api/clothes/hello/goodbye")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request");
      });
  });
});
