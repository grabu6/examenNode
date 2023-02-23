const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllEstocs = (filterParams)=>{
    try {
        let estocs = DB.estocs;

        if(filterParams.venda){
        return DB.estocs.filter(estoc => estoc.venda.toLowerCase().includes(filterParams.venda));
        }   
        return estocs; 
    } catch (error) {
        throw { status: 500, message: error };
      }
};


const getAllEstocsDisponibles = () => {
    return DB.estocs.filter(estoc => (estoc.venda === 0 || estoc.venda === "") && new Date(estoc.caducitat) > new Date());
};

const getAllEstocsDeProducte = (producteId) => {
    try {
        const estocs= DB.estocs.filter((estoc) => estoc.id === producteId);
        if (estocs.length === 0) {
            throw {
              status: 400,
              message: `Can't find estocs for product with the id '${producteId}'`,
            };
          }
        
        return estocs;

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

const getOneEstoc= (estocId) => {
  try {
    const estoc = DB.estocs.find((estoc) => estoc.id === estocId);

    if (!estoc) {
      throw {
        status: 400,
        message: `Can't find estoc with the id '${estocId}'`,
      };
    }

    return estoc;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewEstoc = (newEstoc) => {
  try {
    const isAlreadyAdded =
      DB.estocs.findIndex((estoc) => estoc.producte === newEstoc.producte) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Estoc with the name '${newEstoc.producte}' already exists`,
      };
    }

    DB.estocs.push(newEstoc);
    saveToDatabase(DB);
    return newEstoc;

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
  getAllEstocs,
  getAllEstocsDisponibles,
  getAllEstocsDeProducte,
  getAllEstocsDeMaquina,
  getOneEstoc,
  createNewEstoc,
  updateOneEstoc,
  deleteOneEstoc,
};
