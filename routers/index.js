const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");
const userModel = require("../models/user");
route.get("/", (req, res) => {
  res.send("Hi");
});

route.post("/users", userController.createUser);
route.get("/users", async (req, res) => {
  const users = await userModel.find();
  res.json(users);
});

module.exports = route;
