import Missile from "../models/Missile.js";
import Country from "../models/Country.js";
import { Router } from "express";
import axios from "axios";
import mongoose from "mongoose";

const router = Router();
// // // setting all 25 mongodb interaction methods here for usage
// indox methods (create, get, drop) - works on the missle collection only on the range attribute
router.post("/index", async (req, res) => {
    try {
        const index = await Missile.collection.createIndex(
            { range: 1 }, // ascending index on `range`
            { name: "range_index" } // custom name
        );
        console.log("Range index created:", index);
        res.status(200).json({ message: "Range index created successfully", index });
    } catch (error) {
        console.log("Error creating range index:", error);
        res.status(400).json({ error: error.message });
    }
});


router.get("/index", async (req, res) => {
    try {
        const indexes = await Missile.collection.getIndexes();
        console.log("Retrieved indexes:", indexes);
        res.status(200).json(indexes);
    } catch (error) {
        console.log("Error getting indexes:", error);
        res.status(400).json({ error: error.message });
    }
});

router.delete("/index", async (req, res) => {
    try {
        const result = await Missile.collection.dropIndex("range_index");
        console.log("Range index dropped:", result);
        res.status(200).json({ message: "Range index dropped successfully", result });
    } catch (error) {
        console.log("Error dropping range index:", error);
        res.status(400).json({ error: error.message });
    }
});


// // add page methods
// add one
router.post("/", async (req, res) => {
    try {
        console.log("post single attempted:", req.body);
        const {name, range, payload, countryname} = req.body;
        const country = await Country.findOne({name: countryname});
        if (!country) {
            console.log("country not found while adding single missile");
            return res.status(404).json({ error: "Country not found" });
        }
        console.log("trying to create missile")
        // create new missile
        const missile = new Missile({
            name: name.toLowerCase(),
            range,
            payload,
            country: country._id
        });
        console.log("missile created")
        // save missile to db
        await missile.save();
        res.status(201).json(missile);
    } catch (error) {
        console.log("error in adding single missile", error);
        res.status(400).json({ error: error.message });
    }
});
// add many
router.post("/many", async (req, res) => {
    try {
        const missiles = req.body;
        const country = await Country.findOne({name: missiles[0].countryname});
        if (!country) {
            return res.status(404).json({ error: "Country not found" });
        }
        // create new missile
        const missile = missiles.map((missile) => ({
            name: missile.name.toLowerCase(),
            range: missile.range,
            payload: missile.payload,
            country: country._id
        }));
        // save missile to db
        await Missile.insertMany(missile);
        res.status(201).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// // view page methods
// find all missiles
router.get("/", async (req, res) => {
    try {
        const missiles = await Missile.find().populate("country");
        console.log("all missile data", missiles.slice(0, 3));
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// count documents
router.get("/count", async (req, res) => {
    try {
        console.log("query reached here in count");
        const count = await Missile.countDocuments();
        console.log("count data", count);
        res.status(200).json(count);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// distinct ranges
router.get("/distinct", async (req, res) => {
    try {
        const distinctmissiles = await Missile.distinct("range");
        console.log("distinct data", distinctmissiles);
        res.status(200).json(distinctmissiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// sort missiles
router.get("/sort", async (req, res) => {
    try {
        const missiles = await Missile.find().sort({ name: 1 }).populate("country");
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// agggregate by range
router.get("/aggregate", async (req, res) => {
    try {
        const missiles = await Missile.aggregate([
            {
                $group: {
                    _id: "$range",
                    count: { $sum: 1 }
                }
            }
        ]);
        console.log("aggregate data by range:", missiles);
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// find with limit
router.get("/limit/:limit", async (req, res) => {
    try {
        const missiles = await Missile.find().limit(parseInt(req.params.limit)).populate("country");
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// find with skip
router.get("/skip/:skip", async (req, res) => {
    try {
        const missiles = await Missile.find().skip(parseInt(req.params.skip)).populate("country");
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// find one by name - this should be last as it has a parameter
router.get("/:name", async (req, res) => {
    try {
        const missile = await Missile.findOne({ name: req.params.name.toLowerCase() }).populate("country");
        if (!missile) {
            return res.status(404).json({ error: "Missile not found" });
        }
        console.log("one missile data: ", missile);
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// // update page methods

// update many
router.patch("/many", async (req, res) => {
    try {
        const { name, range, payload, countryname } = req.body;
        const missiles = await Missile.updateMany(
            { name: name.toLowerCase() },
            {
                $set: {
                    range,
                    payload,
                    country: countryname
                }
            }
        );
        if (!missiles) {
            return res.status(404).json({ error: "Missile not found" });
        }
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update one
router.patch("/:name", async (req, res) => {
    try {
        const oldmissile = await Missile.findOne({ name: req.params.name.toLowerCase() });
        if (!oldmissile) {
            return res.status(404).json({ error: "Missile not found" });
        }
        const { newname, range, payload, countryname } = req.body;
        const updatedmissile = await Missile.updateOne(
            { name: req.params.name.toLowerCase() },
            {
                $set: {
                    name: newname,
                    range,
                    payload,
                    country: countryname
                }
            }
        );
        res.status(200).json(updatedmissile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// find one and update
router.patch("/findand/:name", async (req, res) => {
    try {
        const {name, range, payload, countryname} = req.body;
        const missile = await Missile.findOneAndUpdate(
            { name: req.params.name.toLowerCase() },
            {
                $set: {
                    name,
                    range,
                    payload,
                    country: countryname
                }
            },
            { new: true }
        );
        if (!missile) {
            return res.status(404).json({ error: "Missile not found" });
        }
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// // replace page methods
// replace one
router.put("/replace/:name", async (req, res) => {
    try {
        const { name, range, payload, countryname } = req.body;
        const missile = await Missile.replaceOne(
            { name: req.params.name.toLowerCase() },
            {
                name,
                range,
                payload,
                country: countryname
            }
        );
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// find one and replace
router.put("/findand/:name", async (req, res) => {
    try {
        const {name, range, payload, countryname} = req.body;
        const missile = await Missile.findOneAndReplace(
            { name: req.params.name.toLowerCase() },
            {
                name,
                range,
                payload,
                country: countryname
            },
            { new: true }
        );
        if (!missile) {
            return res.status(404).json({ error: "Missile not found" });
        }
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// // delete page methods
// delete many
router.delete("/many", async (req, res) => {
    try {
        const { name } = req.body;
        const missiles = await Missile.deleteMany({ name: name.toLowerCase() });
        if (!missiles) {
            return res.status(404).json({ error: "Missile not found" });
        }
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// delete one
router.delete("/:name", async (req, res) => {
    try {
        const nametoDelete = req.params.name.toLowerCase()
        console.log("searching fordelete one :", nametoDelete);
        const missile = await Missile.deleteOne({ name: nametoDelete });
        if (!missile) {
            console.log("missile not found while deleting one");
            return res.status(404).json({ error: "Missile not found in database" });
        }
        console.log("deleted successfully");
        
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// find one and delete
router.delete("/findand/:name", async (req, res) => {
    try {
        const missile = await Missile.findOneAndDelete({ name: req.params.name.toLowerCase() });
        if (!missile) {
            return res.status(404).json({ error: "Missile not found" });
        }
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;