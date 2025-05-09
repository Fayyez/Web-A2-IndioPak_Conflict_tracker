// this is the main express server

import { config } from "dotenv";
config();

import {countryRouter} from "./routes/countryRoutes.js";
import {missileRouter} from "./routes/missleRoutes.js";
import express from "express";
import mongoose from "mongoose";

// confirgue db
// create server
// set middleware
// stasrt server