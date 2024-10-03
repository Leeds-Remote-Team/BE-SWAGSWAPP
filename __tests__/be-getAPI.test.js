const request = require("supertest");
const app = require("../apps/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const { userData, clothesData } = require("../db/data/test-data/index.js");
const endpointsJSON = require("../endpoints.json");

beforeAll(() => {
  return seed({ userData, clothesData });
});
afterAll(() => {
  return db.end();
});

describe("GET - /api", () => {
  it("should serve up a json representation of all the available endpoints of the api", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.api).toEqual(endpointsJSON);
      });
  });
});
