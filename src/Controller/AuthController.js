"use strict";
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
exports.deleteUser = exports.updateUser = exports.findUsers = exports.findUser = exports.signIn = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("../Config/cloudinary"));
const todoAuth_1 = __importDefault(require("../Models/todoAuth"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload(req.file.path);
        const newUser = yield todoAuth_1.default.create({
            username,
            email,
            password: hashed,
            avatar: secure_url,
            avatarID: public_id
        });
        res.status(201).json({
            message: "User registered successfully",
            data: newUser
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Cannot register user",
            data: error.message
        });
    }
});
exports.registerUser = registerUser;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield todoAuth_1.default.findOne({ email });
        if (user) {
            const checked = yield bcrypt_1.default.compare(password, user.password);
            if (checked) {
                res.status(200).json({
                    message: `welcome back ${user.username}`,
                    data: user._id
                });
            }
            else {
                res.status(400).json({
                    message: "Incorrect password",
                });
            }
        }
        else {
            res.status(404).json({
                message: "Cannot find user"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "cannot sign user in",
            data: error.message
        });
    }
});
exports.signIn = signIn;
const findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const oneUser = yield todoAuth_1.default.findById(userID);
        res.status(200).json({
            message: "Gotten user",
            data: oneUser === null || oneUser === void 0 ? void 0 : oneUser._id
        });
    }
    catch (error) {
        res.status(400).json({
            message: "cannot get user",
            data: error.message
        });
    }
});
exports.findUser = findUser;
const findUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield todoAuth_1.default.find().sort({ updatedAt: -1 });
        res.status(200).json({
            message: "Gotten all user",
            data: allUsers
        });
    }
    catch (error) {
        res.status(400).json({
            message: "cannot get all users",
            data: error.message
        });
    }
});
exports.findUsers = findUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { username } = req.body;
        const patchUser = yield todoAuth_1.default.findByIdAndUpdate(userID, { username });
        res.status(200).json({
            message: "User updated",
            data: patchUser
        });
    }
    catch (error) {
        res.status(400).json({
            message: "cannot update user",
            data: error.message
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const removeUser = yield todoAuth_1.default.findByIdAndDelete(userID);
        res.status(200).json({
            message: "User deleted",
            data: removeUser
        });
    }
    catch (error) {
        res.status(400).json({
            message: "cannot delete user",
            data: error.message
        });
    }
});
exports.deleteUser = deleteUser;
