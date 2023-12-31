"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_string = process.env.DB_STRING;
const dbConfig = () => {
    try {
        mongoose_1.default.connect(DB_string).then(() => {
            console.log("DataBase Connected!");
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = dbConfig;
