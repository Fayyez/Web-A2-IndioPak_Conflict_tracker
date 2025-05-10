import { Router } from "express";
import Country from "../models/Country";
import axios from "axios";
// set all routes to get, post, get by name, delete country by name in this file

const router = Router();

// get all countries
router.get("/", async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post("/", async (req, res) => {
    const {name, code, nationallanguage} = req.body;
    name = name.toLowerCase();
    code = code.toLowerCase();
    nationallanguage = nationallanguage.toLowerCase();
    const country = new Country({name, code, nationallanguage});
    try {
        const savedCountry = await country.save();
        res.status(201).json(savedCountry);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// get country by name
router.get("/:name", async (req, res) => {
    const {name} = req.params;
    try {
        const country = await Country.findOne({name: name.toLowerCase()});
        if (!country) {
            return res.status(404).json({message: "Country not found"});
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// delete country by name
router.delete("/:name", async (req, res) => {
    const {name} = req.params;
    try {
        const country = await Country.findOneAndDelete({name: name.toLowerCase()});
        if (!country) {
            return res.status(404).json({message: "Country not found"});
        }
        res.status(200).json({message: "Country deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
