"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DB_1 = __importDefault(require("./Config/DB"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT);
const app = (0, express_1.default)();
(0, app_1.default)(app);
const server = app.listen(process.env.PORT || port, () => {
    console.log("Server is coonnected on port: ", port);
    (0, DB_1.default)();
});
process.on("uncaughtException", (error) => {
    console.log("server is shutting down because of uncaughtException");
    console.log("uncaughtException error:", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("This server is shutting down because of unhandledRejection");
    console.log("unhandledRejection reason: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
