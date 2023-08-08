"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../Controller/AuthController");
const multer_1 = __importDefault(require("../Config/multer"));
const router = express_1.default.Router();
router.route("/register").post(multer_1.default, AuthController_1.registerUser);
router.route("/signin").post(AuthController_1.signIn);
router.route("/:userID/find-one-user").get(AuthController_1.findUser);
router.route("/findusers").get(AuthController_1.findUsers);
router.route("/:userID/update-user").patch(AuthController_1.updateUser);
router.route("/:userID/delete-user").delete(AuthController_1.deleteUser);
exports.default = router;
