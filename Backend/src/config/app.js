import express from "express";
import { ServerLog } from "../middlewares/log.js";
import apiRouter from "../routers/api.js";
import { errorHandler, notFoundRoute } from "../middlewares/error.js";
import cors from "cors";

const app = express();

app.use(express.json());

// app.use(cors({
//     origin: "http://localhost:5173", // sin barra final
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));
app.use(cors());

app.use(ServerLog);

// Rutas
app.use("/api", apiRouter);

// Manejo de rutas no definidas (404)
app.use(notFoundRoute);

// Manejo de errores generales
app.use(errorHandler);

export default app;
