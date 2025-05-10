import mongoose from "mongoose";

const missileSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: true, unique: true},
    range: {type: mongoose.Schema.Types.String, required: true, enum: ["short", "medium", "long"]},
    payload: {type: mongoose.Schema.Types.Number},
    country: {type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true},
}, {timestamps: true});

export default mongoose.model("Missile", missileSchema);