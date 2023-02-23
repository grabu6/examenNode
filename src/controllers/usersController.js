const usersServices = require("../services/usersServices");

const getAllUsers = (req, res) => {
  try {
    const allUsers = usersServices.getAllUsers();
    res.send({status: "OK", data: allUsers});
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewUsuari = (req, res) => {
  const { body } = req;

  if (
      !body.username ||
      !body.fullName
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'username', 'fullName'",
      },
    });
  }

  const newUsuari = {
    username: body.username,
    fullName: body.fullName,
  };

  try {
    const createdUsuari = usersServices.createNewUsuari(newUsuari);
    res.status(201).send({ status: "OK", data: createdUsuari });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};
module.exports = {
  getAllUsers,
  createNewUsuari,
};
