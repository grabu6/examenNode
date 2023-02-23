const { v4: uuid } = require("uuid");
const Estocs = require("../database/Estocs");

const getAllEstocs =  (filterParams) => {
  try {
    const allEstocs= Estocs.getAllEstocs(filterParams);
    return allEstocs;
  } catch (error) {
    throw error;
  }
};

const getAllEstocsDisponibles = (disponible) => {
  try {
    const allEstocs= Estocs.getAllEstocsDisponibles({disponible});
    return allEstocs;
  } catch (error) {
    throw error;
  }
};


const getAllEstocsDeProducte = (producteId) => {
  try {
    const allEstocs= Estocs.getAllEstocsDeProducte(producteId);
    return allEstocs;
  } catch (error) {
    throw error;
  }
};

const getAllEstocsDeMaquina = (maquinaId) => {
  try {
    const allEstocs= Estocs.getAllEstocsDeMaquina(maquinaId);
    return allEstocs;
  } catch (error) {
    throw error;
  }
};


const getOneEstoc = (estocId) => {
  try {
    const estoc= Estocs.getOneEstoc(estocId);
    return estoc;
  } catch (error) {
    throw error;
  }
};

const createNewEstoc = (newEstoc) => {
  const estocToInsert = {
    ...newEstoc,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdEstoc = Estocs.createNewEstoc(estocToInsert);
    return createdEstoc;
  } catch (error) {
    throw error;
  }
};

const updateOneEstoc = (estocId, changes) => {
  try {
    const updatedEstoc= Estocs.updateOneEstoc(estocId, changes);
    return updatedEstoc;
  } catch (error) {
    throw error;
  }
};

const deleteOneEstoc = (estocId) => {
  try {
    Estocs.deleteOneEstoc(estocId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEstocs,
  getAllEstocsDisponibles,
  getAllEstocsDeProducte,
  getAllEstocsDeMaquina,
  getOneEstoc,
  createNewEstoc,
  updateOneEstoc,
  deleteOneEstoc,
};
