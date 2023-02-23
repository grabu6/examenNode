const DB=require("./db.json");
const { saveToDatabase } = require("./utils");


const getOneTask = (taskId) => {
  try {
    const task = DB.tasks.find((tasks) => tasks.id ==taskId);
    if (!task) {
      throw {
        status: 400,
        message: `Can't find task with the id '${taskId}'`,
      };
    }
    return task;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getAllTaskOneUser = (taskId,filterParams) => {
  try {
      const tasks= DB.tasks.filter((task) => task.id == taskId);
      if(filterParams.status){
        return DB.tasks.filter(task=>task.id==taskId && task.status.toLocaleLowerCase().includes(filterParams.status))
      }
      if (tasks.length === 0) {
          throw {
            status: 400,
            message: `Can't find estocs for product with the id '${taskId}'`,
          };
        }
      
      return tasks;

  } catch (error) {
    throw { status: 500, message: error };
  }
};




const createNewTask = (newTask) => {
  try {
    const isAlreadyAdded =
      DB.tasks.findIndex((task) => task.id === newTask.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Product with the name '${newTask.id}' already exists`,
      };
    }

    DB.tasks.push(newTask);
    saveToDatabase(DB);
    return newTask;

  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneTask = (taskId, changes) => {
  try {
    const isAlreadyAdded =
      DB.tasks.findIndex((task) => task.id == changes.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Producte with the name '${changes.id}' already exists`,
      };
    }

    const indexForUpdate = DB.tasks.findIndex(
      (task) => task.id == taskId
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find producte with the id '${taskId}'`,
      };
    }

    const updatedTask = {
      ...DB.tasks[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.tasks[indexForUpdate] = updatedTask;
    saveToDatabase(DB);

    return updatedTask;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneTask = (taskId) => {
  try {
    const indexForDeletion = DB.tasks.findIndex(
      (task) => task.id == taskId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find task with the id '${taskId}'`,
      };
    }
    DB.tasks.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getOneTask,
  getAllTaskOneUser,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};
