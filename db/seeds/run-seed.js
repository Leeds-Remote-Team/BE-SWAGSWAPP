const seed = require("./seed.js");
const db = require("../connection.js");
const testData = require("../data/test-data/index.js");

const runSeed = () => {
  return seed(testData).then(() => db.end());
};

runSeed();
