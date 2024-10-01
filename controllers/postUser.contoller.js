const { addUser } = require("../models/addUser.model");

exports.postUser = (req, res, next) => {
  const { username, password, first_name, last_name, user_preferences } =
    req.body;
  return addUser(username, password, first_name, last_name, user_preferences)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      next(err);
    });
};
