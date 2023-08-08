"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = __importDefault(require("./Routers/UserRouter"));
const TaskRouter_1 = __importDefault(require("./Routers/TaskRouter"));
const appConfig = (app) => {
    app
        .use((0, cors_1.default)())
        .use(express_1.default.json())
        .use("/api", UserRouter_1.default)
        .use("/api", TaskRouter_1.default)
        .get("/", (req, res) => {
        try {
            res.status(200).json({
                message: "Connected successfully!"
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.default = appConfig;
