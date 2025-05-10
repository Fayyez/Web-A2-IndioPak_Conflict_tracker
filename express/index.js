// this is the main express server

import { config } from "dotenv";
config();

import {countryRouter} from "./routes/countryRoutes.js";
import {missileRouter} from "./routes/missleRoutes.js";
import express from "express";
import mongoose from "mongoose";

// confirgue db
const db_uri = process.env.MONGO_URI;
mongoose.connect(db_uri,)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
// create server
const app = express();
app.use(express.json());
// set routes
app.use("/country", countryRouter);
app.use("/missile", missileRouter);

// other methods

// listcollections

// drop

// indox methods (create, get, drop)

// bulkwrite method

// aggregate

// rename collection

const PORT = process.env.PORT || 3000;
// stasrt server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});