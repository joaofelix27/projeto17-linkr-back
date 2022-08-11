import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Servidor is running on port ${PORT}`));

