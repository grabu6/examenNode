const { v4: uuid } = require("uuid");
const Users = require("../database/Users");

const getAllUsers = () => {
  try {
    const allUsers= Users.getAllUsers();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

const createNewUsuari = (newUsuari) => {
  const usuariToInsert = {
    ...newUsuari,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const usuariCreated = Users.createNewUsuari(usuariToInsert);
    return usuariCreated;
  } catch (error) {
    throw error;
  }
};

const updateOneProducte = (producteId, changes) => {
  try {
    const updatedProducte = Productes.updateOneProducte(producteId, changes);
    return updatedProducte;
  } catch (error) {
    throw error;
  }
};

const deleteOneProducte = (producteId) => {
  try {
    Productes.deleteOneProducte(producteId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  createNewUsuari,
  updateOneProducte,
  deleteOneProducte,
};
