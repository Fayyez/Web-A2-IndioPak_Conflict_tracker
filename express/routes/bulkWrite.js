// define a function that bulk write two countries (india and pakistan) and many missles for each country
import mongoose from "mongoose";
import Missile from "../models/Missile.js";
import Country from "../models/Country.js";

const arrayOfMissiles = [ 
    { name: "Agni", range: "long", payload: 5000, country: "India" },
    { name: "Shaheen", range: "medium", payload: 2000, country: "Pakistan" },
    { name: "BrahMos", range: "short", payload: 300, country: "India" },
    { name: "Ra'ad", range: "short", payload: 700, country: "Pakistan" },
    { name: "Prithvi", range: "short", payload: 150, country: "India" },
    { name: "Ghauri", range: "medium", payload: 1500, country: "Pakistan" },
    { name: "Nirbhay", range: "medium", payload: 1000, country: "India" },
    { name: "Hatf", range: "medium", payload: 2000, country: "Pakistan" },
    { name: "K-4", range: "long", payload: 3500, country: "India" },
    { name: "Shaheen-3", range: "medium", payload: 2500, country: "Pakistan" },
    { name: "Agni-V", range: "long", payload: 5000, country: "India" },
    { name: "Ababeel", range: "medium", payload: 2200, country: "Pakistan" },
    { name: "K-15", range: "short", payload: 750, country: "India" },
    { name: "Ra'ad-II", range: "medium", payload: 2000, country: "Pakistan" },
    { name: "Agni-IV", range: "long", payload: 4000, country: "India" },
    { name: "Shaheen-1A", range: "medium", payload: 1000, country: "Pakistan" },
    { name: "BrahMos-II", range: "short", payload: 600, country: "India" },
    { name: "Ghaznavi", range: "short", payload: 290, country: "Pakistan" },
    { name: "Agni-III", range: "long", payload: 3000, country: "India" },
    { name: "Shaheen-2", range: "medium", payload: 1500, country: "Pakistan" },
    { name: "Nirbhay-II", range: "medium", payload: 1200, country: "India" },
    { name: "Hatf-IX", range: "short", payload: 60, country: "Pakistan" },
    { name: "K-5", range: "long", payload: 5000, country: "India" },
    { name: "Shaheen-4", range: "long", payload: 4000, country: "Pakistan" },
    { name: "Agni-VI", range: "long", payload: 8000, country: "India" },
    { name: "Ababeel-II", range: "long", payload: 3000, country: "Pakistan" }
];

export const bulkWrite = async (req, res) => {
    try {
        // First create or get the countries
        const countries = await Country.find({ name: { $in: ["India", "Pakistan"] } });
        
        if (countries.length === 0) {
            // Create countries if they don't exist
            const newCountries = await Country.insertMany([
                { name: "India", code: "IN", nationallanguage: "hindi" },
                { name: "Pakistan", code: "PK", nationallanguage: "urdu" }
            ]);
            console.log("Countries created:", newCountries);
        }

        // Get fresh list of countries
        const updatedCountries = await Country.find({ name: { $in: ["India", "Pakistan"] } });
        
        // Create missiles with proper country references
        const missiles = await Missile.bulkWrite(
            arrayOfMissiles.map(missile => {
                const country = updatedCountries.find(c => c.name === missile.country);
                if (!country) {
                    throw new Error(`Country ${missile.country} not found`);
                }
                return {
                    insertOne: {
                        document: {
                            name: missile.name.toLowerCase(),
                            range: missile.range,
                            payload: missile.payload,
                            country: country._id
                        }
                    }
                }
            })
        )
        console.log("Missiles created:", missiles);
        return missiles;
    } catch (error) {
        console.error("Error in bulk write:", error);
        throw error;
    }
}