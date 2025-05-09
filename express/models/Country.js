import mongoose from "mongoose";

// create a mongoose schema for a country with basic info
const countrySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    nationallanguage: {type: String}
}, {timestamps: true});
//export the schema
const Country = mongoose.model("Country", countrySchema);
export default Country;