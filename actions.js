"use server";

import connectToDatabase from "../lib/mongodb";
import Task from "../models/task";

// Helper function to clean data
const cleanTask = (task) => ({
  ...task,
  _id: task._id.toString(), // Convert ObjectId to string
  createdAt: task.createdAt?.toISOString(), // Optional: Format dates to strings
  updatedAt: task.updatedAt?.toISOString(),
});

// Create Task
export async function createTask(data) {
  try {
    await connectToDatabase();
    const newTask = await Task.create({ title: data.title, completed: false });
    return cleanTask(newTask.toObject());
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: "Failed to create task" };
  }
}

// Get All Tasks
export async function getTasks() {
  try {
    await connectToDatabase();
    const tasks = await Task.find().lean(); // Ensure plain objects
    return tasks.map(cleanTask); // Clean each task object
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

// Get Task by ID
export async function getTask(id) {
  try {
    await connectToDatabase();
    const task = await Task.findById(id).lean();
    return task ? cleanTask(task) : null;
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
}

// Update Task
export async function updateTask(id, updatedData) {
  try {
    await connectToDatabase();
    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, {
      new: true,
      lean: true,
    });
    return updatedTask ? cleanTask(updatedTask) : null;
  } catch (error) {
    console.error("Error updating task:", error);
    return { error: "Failed to update task" };
  }
}

// Delete Task
export async function deleteTask(id) {
  try {
    await connectToDatabase();
    await Task.findByIdAndDelete(id);
    return { message: "Task deleted" };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { error: "Failed to delete task" };
  }
}
