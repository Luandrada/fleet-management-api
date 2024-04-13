import express from 'express';
import path  from 'path';

import taxisRoutes from "./routes/taxis.routes.ts";

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {title:"Fleet Management API" , version: "1.0.0"},
    },
    apis: [
        `${path.join(__dirname, "./routes/*.ts")}  ` 
    ]
};

const PORT = 3000;
const app = express ();


app.use(express.json());
app.use('/api', taxisRoutes);
app.use("/api-doc", swaggerUI.serve , swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

app.listen(PORT);

console.log('Escuchando en ', PORT)