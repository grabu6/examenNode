const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const cors = require("cors");
const apicache = require("apicache");
const v1ProductesRouter = require("./v1/routes/productesRoutes");
const v1EstocsRouter = require("./v1/routes/estocsRoutes");
const v1MaquinessRouter = require("./v1/routes/maquinesRoutes");


const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(cors())
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/productes", v1ProductesRouter);
app.use("/api/v1/estocs", v1EstocsRouter);
app.use("/api/v1/maquines", v1MaquinessRouter);


app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
