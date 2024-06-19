import express from "express";

import connectDatabase from "./database/db.js";
import routes from "./routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

connectDatabase()
  .then(() => {
    app.listen(8001, () =>
      console.log("Servidor rodando e banco de dados conectado")
    );
  })
  .catch((error) => console.log(error));
