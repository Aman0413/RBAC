import { Request, Response } from "express";
import User from "../models/userModel";
import Task from "../models/taskModel";

const getMyProfile = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { id } = req.user;
    console.log("ID", id);
    if (!id) return res.status(400).json({ message: "Invalid user" });

    // find user by id
    const user = await User.findById(id).select("-password");

    if (!user) return res.status(400).json({ message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get all tasks
const fetchAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({
      //@ts-ignore
      assignedTo: req.user.id, // Filter by `assignedTo`
    }).populate("assignedTo");
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// mark task as completed
const markTaskAsCompleted = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { taskId } = req.body;
    //@ts-ignore
    if (!taskId)
      return res
        .status(400)
        .json({ success: false, message: "Invalid task id" });

    // find task by id
    const task = await Task.findById(taskId);
    //@ts-ignore
    if (!task)
      return res
        .status(400)
        .json({ success: false, message: "Task not found" });

    task.status = "Completed";
    await task.save();
    //@ts-ignore
    return res.status(200).json({ success: true, message: "Task completed" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { getMyProfile, markTaskAsCompleted, fetchAllTasks };
