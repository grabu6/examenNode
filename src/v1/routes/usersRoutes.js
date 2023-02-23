const express = require("express");
const userController = require("../../controllers/usersController");
const router = express.Router();

router
  .get("/", userController.getAllUsers)
  .post("/", userController.createNewUsuari)

module.exports = router;
