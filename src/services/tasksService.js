const { v4: uuid } = require("uuid");
const Productes = require("../database/Productes");

const getAllProductes = () => {
  try {
    const allProductes= Productes.getAllProductes();
    return allProductes;
  } catch (error) {
    throw error;
  }
};

const getOneProducte = (producteId) => {
  try {
    const producte= Productes.getOneProducte(producteId);
    return producte;
  } catch (error) {
    throw error;
  }
};

const createNewProducte = (newProducte) => {
  const producteToInsert = {
    ...newProducte,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdProducte = Productes.createNewProducte(producteToInsert);
    return createdProducte;
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
  getAllProductes,
  getOneProducte,
  createNewProducte,
  updateOneProducte,
  deleteOneProducte,
};
