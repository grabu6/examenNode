const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllProductes = () => {
  try {
    let productes = DB.productes;
    return productes;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneProducte = (producteId) => {
  try {
    const producte = DB.productes.find((producte) => producte.id === producteId);

    if (!producte) {
      throw {
        status: 400,
        message: `Can't find producte with the id '${producteId}'`,
      };
    }

    return producte;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewProducte = (newProducte) => {
  try {
    const isAlreadyAdded =
      DB.productes.findIndex((producte) => producte.nom === newProducte.nom) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Product with the name '${newProducte.nom}' already exists`,
      };
    }

    DB.productes.push(newProducte);
    saveToDatabase(DB);
    return newProducte;

  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneProducte = (producteId, changes) => {
  try {
    const isAlreadyAdded =
      DB.productes.findIndex((producte) => producte.nom === changes.nom) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Producte with the name '${changes.nom}' already exists`,
      };
    }

    const indexForUpdate = DB.productes.findIndex(
      (producte) => producte.id === producteId
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find producte with the id '${producteId}'`,
      };
    }

    const updatedProducte = {
      ...DB.productes[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.productes[indexForUpdate] = updatedProducte;
    saveToDatabase(DB);

    return updatedProducte;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneProducte = (producteId) => {
  try {
    const indexForDeletion = DB.productes.findIndex(
      (producte) => producte.id === producteId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find producte with the id '${producteId}'`,
      };
    }
    DB.productes.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllProductes,
  getOneProducte,
  createNewProducte,
  updateOneProducte,
  deleteOneProducte,
};
