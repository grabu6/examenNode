const estocService = require("../services/estocsService");

const getAllEstocs = (req, res) => {
    const {venda}=req.query;
    try {
      const allEstocs = estocService.getAllEstocs({venda});
      res.send({status: "OK", data: allEstocs});
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };


const getAllEstocsDisponibles = (req, res) => {
  const {disponible}=req.query;
  try {
    if(disponible !== undefined && disponible !== null){
      const allEstocs = estocService.getAllEstocsDisponibles({disponible});
      res.send({status: "OK", data: allEstocs}); 
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllEstocsDeProducte = (req, res) => {
  const {
    params: { producteId },
  } = req;
  try {
    const allEstocs = estocService.getAllEstocsDeProducte(producteId);
    res.send({status: "OK", data: allEstocs});
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const getAllEstocsDeMaquina = (req, res) => {
  const {
    params: { maquinaId },
  } = req;
  try {
    const allEstocs = estocService.getAllEstocsDeMaquina(maquinaId);
    res.send({status: "OK", data: allEstocs});
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const getOneEstoc = (req, res) => {
  const {
    params: { estocId },
  } = req;
  if (!estocId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':estocId' can not be empty" },
    });
    return;
  }

  try {
    const estoc = estocService.getOneEstoc(estocId);
    res.send({ status: "OK", data: estoc });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewEstoc = (req, res) => {
  const { body } = req;

  if (
      !body.producte ||
      !body.caducitat ||
      !body.data_venda ||
      !body.ubicacio 
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'producte', 'caducitat', 'data_venda', 'ubicacio'",
      },
    });
  }

  const newEstoc = {
    producte: body.producte,
    caducitat: body.caducitat,
    data_venda: body.data_venda,
    ubicacio: body.ubicacio,
  };

  try {
    const createdEstoc = estocService.createNewEstoc(newEstoc);
    res.status(201).send({ status: "OK", data: createdEstoc });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const updateOneEstoc = (req, res) => {
  const {
    body,
    params: { estocId },
  } = req;

  if (!estocId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':estocId' can not be empty" },
    });
  }

  try {
    const updatedEstoc =estocService.updateOneEstoc(estocId, body);
    res.send({ status: "OK", data: updatedEstoc });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneEstoc= (req, res) => {
  const {
    params: { estocId },
  } = req;

  if (!estocId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':estocId' can not be empty" },
    });
  }

  try {
    estocService.deleteOneEstoc(estocId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
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
