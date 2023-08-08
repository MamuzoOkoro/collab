"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTask = exports.CreateTask = void 0;
const Taskmodel_1 = __importDefault(require("../Models/Taskmodel"));
const todoAuth_1 = __importDefault(require("../Models/todoAuth"));
const mongoose_1 = __importDefault(require("mongoose"));
const CreateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.body;
        const { id } = req.params;
        const user = yield todoAuth_1.default.findById(id);
        if (user) {
            const Task = yield Taskmodel_1.default.create(task);
            yield (user === null || user === void 0 ? void 0 : user.task.push(new mongoose_1.default.Types.ObjectId(Task._id)));
            user.save();
        }
        else {
            res.status(404).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
});
exports.CreateTask = CreateTask;
const DeleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.params;
        const { user } = req.params;
        const User = yield todoAuth_1.default.findById(user);
        const Task = yield Taskmodel_1.default.findByIdAndDelete(task);
        res.status(200).json({
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
});
exports.DeleteTask = DeleteTask;
