import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
