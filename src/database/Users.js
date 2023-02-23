const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllUsers = ()=>{
    try {
        return DB.users;
    } catch (error) {
        throw { status: 500, message: error };
      }
};

const getAllEstocsDeMaquina = (maquinaId) => {
    try {
        const estocs= DB.estocs.filter((estoc) => estoc.id === maquinaId);
        if (estocs.length === 0) {
            throw {
              status: 400,
              message: `Can't find estocs for product with the id '${maquinaId}'`,
            };
          }
        
        return estocs;

    } catch (error) {
      throw { status: 500, message: error };
    }
};

const createNewUsuari = (newUsuari) => {
  try {
    const isAlreadyAdded =
      DB.users.findIndex((user) => user.id === newUsuari.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Estoc with the name '${newUsuari.id}' already exists`,
      };
    }

    DB.users.push(newUsuari);
    saveToDatabase(DB);
    return newUsuari;

  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneEstoc = (estocId, changes) => {
  try {
    const isAlreadyAdded =
      DB.estocs.findIndex((estoc) => estoc.producte === changes.producte) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Producte with the name '${changes.producte}' already exists`,
      };
    }

    const indexForUpdate = DB.estocs.findIndex(
      (estoc) => estoc.id === estocId
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find producte with the id '${estocId}'`,
      };
    }

    const updatedEstoc = {
      ...DB.estocs[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.estocs[indexForUpdate] = updatedEstoc;
    saveToDatabase(DB);

    return updatedEstoc;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneEstoc = (estocId) => {
  try {
    const indexForDeletion = DB.estocs.findIndex(
      (estoc) => estoc.id === estocId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find producte with the id '${estocId}'`,
      };
    }
    DB.estocs.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllUsers,
  createNewUsuari,
  getAllEstocsDeMaquina,
  updateOneEstoc,
  deleteOneEstoc,
};
