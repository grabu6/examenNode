const { v4: uuid } = require("uuid");
const Tasks = require("../database/Tasks.js");

const getOneTask=(taskId) => {
  try {
    const task= Tasks.getOneTask(taskId);
    return task;
  } catch (error) {
    throw error;
  }
};

const getAllTaskOneUser = (taskId,filterParams) => {
  try {
    const allTasks= Tasks.getAllTaskOneUser(taskId,filterParams);
    return allTasks;
  } catch (error) {
    throw error;
  }
};



const createNewTask = (newTask) => {
  const taskToInsert = {
    ...newTask,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdTask = Tasks.createNewTask(taskToInsert);
    return createdTask;
  } catch (error) {
    throw error;
  }
};

const updateOneTask = (taskId, changes) => {
  try {
    const updatedTask= Tasks.updateOneTask(taskId, changes);
    return updatedTask;
  } catch (error) {
    throw error;
  }
};

const deleteOneTask = (taskId) => {
  try {
    Tasks.deleteOneTask(taskId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOneTask,
  getAllTaskOneUser,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};
