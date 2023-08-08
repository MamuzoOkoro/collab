/** @format */

import mongoose from "mongoose";
import { iTask } from "../Config/interface";

interface task extends iTask, mongoose.Document {}

const taskSchema = new mongoose.Schema<iTask>(
  {
    Task: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<task>("Tasks", taskSchema);
