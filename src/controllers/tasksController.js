const tasksServices = require("../services/tasksServices");

const getOneTask = (req, res) => {
  const {
    params: { taskId },
  } = req;
  if (!taskId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':taskId' can not be empty" },
    });
    return;
  }

  try {
    const task = tasksServices.getOneTask(taskId);
    res.send({ status: "OK", data: task });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const getAllTaskOneUser = (req, res) => {
  
  const {status}=req.query;
  const {
    params: { taskId },
  } = req;
  try {
    const allTasks = tasksServices.getAllTaskOneUser(taskId,{status});
    res.send({status: "OK", data: allTasks});
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const createNewTask = (req, res) => {
  const { body } = req;

  if (
      !body.user ||
      !body.title ||
      !body.description ||
      !body.status 
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'user', 'title', 'description', 'status'",
      },
    });
  }

  const newTask = {
    user: body.user,
    title: body.title,
    description: body.description,
    status: body.status,
  };

  try {
    const createdTask = tasksServices.createNewTask(newTask);
    res.status(201).send({ status: "OK", data: createdTask });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const updateOneTask = (req, res) => {
  const {
    body,
    params: { taskId },
  } = req;

  if (!taskId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':taskId' can not be empty" },
    });
  }

  try {
    const updatedTask =tasksServices.updateOneTask(taskId, body);
    res.send({ status: "OK", data: updatedTask });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneTask= (req, res) => {
  const {
    params: { taskId },
  } = req;

  if (!taskId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':taskId' can not be empty" },
    });
  }

  try {
    tasksServices.deleteOneTask(taskId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getOneTask,
  getAllTaskOneUser,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};
