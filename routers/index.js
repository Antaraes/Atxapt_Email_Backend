const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");
route.get("/", (req, res) => {
  res.send("Hi");
});

route.post("/users", userController.createUser);

module.exports = route;
