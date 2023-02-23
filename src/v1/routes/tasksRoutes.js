const express = require("express");
const tasksController = require("../../controllers/tasksController");

const router = express.Router();

router
  .get("/:taskId", tasksController.getOneTask)
  .get("/:taskId/users", tasksController.getAllTaskOneUser)
  .post("/", tasksController.createNewTask)
  .patch("/:taskId",tasksController.updateOneTask)
  .delete("/:taskId",tasksController.deleteOneTask);

module.exports = router;
