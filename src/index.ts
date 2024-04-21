import express from "express";

import taxisRoutes from "./routes/taxis.routes.ts";
import swaggerUI from "swagger-ui-express";

const YAML = require("yamljs");

const swaggerDocument = YAML.load("./src/swaggerconfig.yaml"); // Carga tu archivo YAML

const PORT = 3000;
export const app = express();

app.use(express.json());
app.use("/api", taxisRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Solo inicia el servidor si no estoy en un entorno de prueba para no tener error de puerto en uso en los test PREGUNTAR
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("Escuchando en el puerto", PORT);
  });
}
