"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Taskcontroller_1 = require("../Controller/Taskcontroller");
const router = express_1.default.Router();
router.route("/create-task").post(Taskcontroller_1.CreateTask);
router.route("/delete-task").delete(Taskcontroller_1.DeleteTask);
exports.default = router;
