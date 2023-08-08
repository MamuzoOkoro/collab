/** @format */

import express, { Request, Response } from "express";
import Taskmodel from "../Models/Taskmodel";
import Authmodel from "../Models/todoAuth";
import mongoose from "mongoose";

export const CreateTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const { id } = req.params;
    const user = await Authmodel.findById(id);
    if (user) {
      const Task = await Taskmodel.create(task);
      await user?.task!.push(new mongoose.Types.ObjectId(Task._id));
      user.save();
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const DeleteTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.params;
    const { user } = req.params;
    const User = await Authmodel.findById(user);
    const Task: any = await Taskmodel.findByIdAndDelete(task);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
