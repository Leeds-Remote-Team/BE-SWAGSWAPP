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

describe.only("/api/users/userId", () => {
  it("201: Should add the new user with the given details", () => {
    const newUser = {
      username: "bob",
      password: "1234",
      first_name: "Bob",
      last_name: "Man",
      user_preferences: { style: "Slim-fit" },
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then((response) => {
        console.log(response);
        expect(response.body.user).toEqual(
          expect.objectContaining({
            username: "bob",
            password: "1234",
            first_name: "Bob",
            last_name: "Man",
            user_preferences: { style: "Slim-fit" },
          })
        );
      });
  });
});
