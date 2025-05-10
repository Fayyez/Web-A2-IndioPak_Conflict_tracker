import Missile from "../models/Missile.js";
import Country from "../models/Country.js";
import { Router } from "express";
import axios from "axios";

const router = Router();
// // // setting all 25 mongodb interaction methods here for usage

// // add page methods
// add one
router.post("/", async (req, res) => {
    try {
        const {name, range, payload, countryname} = new Missile(req.body);
        const country = await Country.findOne({name: countryname});
        if (!country) {
            return res.status(404).json({ error: "Country not found" });
        }
        // create new missile
        const missile = new Missile({
            name,
            range,
            payload,
            country: country._id
        });
        // save missile to db
        await missile.save();
        res.status(201).json(missile);
    } catch (error) {
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
            name: missile.name,
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
// find all missles
router.get("/", async (req, res) => {
    try {
        const missiles = await Missile.find().populate("country");
        console.log("all missile data", missiles);
        // send back all the data on missile
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// find one
router.get("/:name", async (req, res) => {
    try {
        const missile = await Missile.findOne({ name: req.params.name.toLowerCase() }).populate("country");
        if (!missile) {
            return res.status(404).json({ error: "Missile not found" });
        }
        // send back the data on missile
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// find limit
router.get("/limit/:limit", async (req, res) => {
    try {
        const missiles = await Missile.find().limit(parseInt(req.params.limit)).populate("country");
        // send back all the data on missile
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// skip
router.get("/skip/:skip", async (req, res) => {
    try {
        const missiles = await Missile.find().skip(parseInt(req.params.skip)).populate("country");
        // send back all the data on missile
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// sort
router.get("/sort", async (req, res) => {
    try {
        const missiles = await Missile.find().sort({ name: 1 }).populate("country");
        // send back all the data on missile
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// distinct label
router.get("/distinct", async (req, res) => {
    try {
        const distinctmissiles = await Missile.distinct("range");
        console.log("distinct data", distinctmissiles);
        // send back all the data on missile
        res.status(200).json(distinctmissiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
// count documents
router.get("/count", async (req, res) => {
    try {
        const count = await Missile.countDocuments();
        console.log("count data", count);
        // send back all the data on missile
        res.status(200).json(count);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// // update page methods
// update one
router.patch("/:name", async (req, res) => {
    try {
        // use the UpdateOne method of databse
        const oldmissile = await Missile.findOne({ name: req.params.name.toLowerCase() });
        if (!oldmissile) {
            return res.status(404).json({ error: "Missile not found" });
        }
        const { newname, range, payload, countryname } = req.body;
        // update the old one with new data
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
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

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
        // send back the data on missile
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
// find one and update, use findoneandupdate method
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
        // send back the data on missile
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// // raplace page methods
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
        // send back the data on missile
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
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
        // send back the data on missile
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// // delete page methods4
// delete one
router.delete("/:name", async (req, res) => {
    try {
        const missile = await Missile.deleteOne({ name: req.params.name.toLowerCase() });
        if (!missile) {
            return res.status(404).json({ error: "Missile not found" });
        }
        // send back the data on missile
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
// delete many
router.delete("/many", async (req, res) => {
    try {
        const { name } = req.body;
        const missiles = await Missile.deleteMany({ name: name.toLowerCase() });
        if (!missiles) {
            return res.status(404).json({ error: "Missile not found" });
        }
        // send back the data on missile
        res.status(200).json(missiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
// find one and delete
router.delete("/findand/:name", async (req, res) => {
    try {
        const missile = await Missile.findOneAndDelete({ name: req.params.name.toLowerCase() });
        if (!missile) {
            return res.status(404).json({ error: "Missile not found" });
        }
        // send back the data on missile
        res.status(200).json(missile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// indox methods (create, get, drop) - works on the missle collection only on the range attribute
router.post("/index", async (req, res) => {
    try {
        const index = await Missile.createIndex({ range: 1 });
        console.log("index created", index);
        res.status(200).json(index);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
router.get("/index", async (req, res) => {
    try {
        const index = await Missile.getIndexes();
        console.log("index data", index);
        res.status(200).json(index);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete("/index", async (req, res) => {
    try {
        const index = await Missile.dropIndex("name_1");
        console.log("index dropped", index);
        res.status(200).json(index);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

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

export default router;