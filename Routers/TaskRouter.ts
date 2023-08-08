/** @format */

import express, { Router } from "express";
import { CreateTask, DeleteTask } from "../Controller/Taskcontroller";

const router = express.Router();

router.route("/create-task").post(CreateTask);
router.route("/delete-task").delete(DeleteTask);

export default router;
