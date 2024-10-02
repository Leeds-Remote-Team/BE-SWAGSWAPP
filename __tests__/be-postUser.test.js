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

describe("/api/users/userId", () => {
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
        expect(response.body).toEqual(
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

  it("400: should return appropriate error message when provided without required user data", () => {
    const newUser = {
      username: "bob@#",
      password: "12@#$%34",
      first_name: "Bob",
      last_name: "Man",
      user_preferences: { style: "Slim-fit" },
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid user data");
      });
  });

  it("400: should return appropriate error message when provided without required user data", () => {
    const newUser = {
      username: "bob",
      user_preferences: { style: "Slim-fit" },
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Must contain the required field");
      });
  });
});
