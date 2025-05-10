// this is the main express server

import { config } from "dotenv";
config();

import countryRouter from "./routes/countryRoutes.js";
import missileRouter from "./routes/missleRoutes.js";
import express from "express";
import mongoose from "mongoose";
import { bulkWrite } from "./routes/bulkWrite.js";
import cors from "cors";
import Missile from "./models/Missile.js";

// confirgue db
const db_uri = process.env.MONGO_URI;
mongoose.connect(db_uri,)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
// create server
const app = express();
app.use(express.json());
app.use(cors());
// set routes
app.use("/country", countryRouter);
app.use("/missile", missileRouter);

// other methods

// listcollections
app.get("/listcollections", async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("all collections", collections);
        res.status(200).json(collections);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// drop - drops the missile collection always
app.get("/dropmissiles", async (req, res) => {
    try {
        // drop the missile collection of the database
        const collection = await mongoose.connection.db.collection("missiles");
        await collection.drop();
        console.log("Missile collection dropped", collection);
        res.status(200).json({ message: `Collection ${collection} dropped` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// bulkwrite method - call the bulk write method
app.get("/bulkwrite", async (req, res) => {
    try {
        // call the bulk write method
        const result = await bulkWrite(req, res);
        console.log("Bulk write successful");
        res.status(200).json({ message: "Bulk write successful" });
    } catch (error) {
        res.status(400).json("bulk write failed");
    }
});

// rename collection
app.get("/rename", async (req, res) => {
    try {
        // if name is Missile get to rename it to Rockets and vice versa
        console.log("trying to rename missile wali collection here");

        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map((collection) => collection.name);
        if (collectionNames.includes("rockets")) {
            // rename to missile
            await mongoose.connection.db.collection("rockets").rename("missiles");
            console.log("Rockets collection renamed to Missiles");
        } else if (collectionNames.includes("missiles")) {
            // rename to rockets
            await mongoose.connection.db.collection("missiles").rename("rockets");
            console.log("Missiles collection renamed to Rockets");
        } else {
            console.log("rename failed");
            throw new Error("cant rename collection");
        }
        res.status(200).json({ message: "Renamed successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// stasrt server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
