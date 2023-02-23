const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const cors = require("cors");
const apicache = require("apicache");
const v1UsersRouter = require("./v1/routes/usersRoutes");
const v1TasksRouter = require("./v1/routes/tasksRoutes");


const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(cors())
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/users", v1UsersRouter);
app.use("/api/v1/tasks", v1TasksRouter);


app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
