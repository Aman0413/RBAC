import { Request, Response } from "express";
import Task from "../models/taskModel";
import User from "../models/userModel";

// modify user to make admin or remove admin and also make user manager
const makeAdmin = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { userId } = req.body;
    console.log("userId", userId);
    //@ts-ignore
    if (req.user.id == userId) {
      //@ts-ignore
      return res
        .status(400)
        .json({ success: false, message: "Cannot modify own role" });
    }
    //@ts-ignore
    if (!userId)
      return res.status(400).json({ success: false, message: "Invalid user" });

    // find user by id
    const user = await User.findById(userId);
    //@ts-ignore
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    if (user.superuser === true) {
      //@ts-ignore
      return res
        .status(400)
        .json({ success: false, message: "Cannot modify superuser" });
    }

    if (user.role === "admin") {
      user.role = "user";
    } else {
      user.role = "admin";
    }

    await user.save();
    //@ts-ignore
    return res.status(200).json({ success: true, user });
  } catch (error) {
    //@ts-ignore
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// add task
const addTask = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { title, description, assignedTo } = req.body;
    if (!title || !description || !assignedTo) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // create task
    const task = new Task({
      title,
      description,
      assignedTo,
      //@ts-ignore
      createdBy: req.user.id,
    });

    await task.save();
    //@ts-ignore
    return res.status(200).json({ success: true, message: "Task created" });
  } catch (error) {
    //@ts-ignore
    return res.status(500).json({ message: "Internal server error" });
  }
};

// remove task
const removeTask = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { taskId } = req.body;
    // find task by id
    const task = await Task.findByIdAndDelete(taskId);
    //@ts-ignore
    if (!task) return res.status(400).json({ message: "Task not found" });

    if (task) {
      //@ts-ignore
      return res.status(200).json({ success: true, message: "Task deleted" });
    }
  } catch (error) {
    //@ts-ignore
    return res.status(500).json({ message: "Internal server error" });
  }
};

// update task status
const updateTask = async (req: Request, res: Response) => {
  try {
    let { taskId, status } = req.body;
    status = status.trim();

    //checking status should be approved or rejected
    if (status !== "Approved" && status !== "Rejected") {
      return res.status(400).json({
        success: true,
        message: "Invalid status, status should be Approved or Rejected",
      });
    }

    // find task by id
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(400).json({ success: true, message: "Task not found" });
    }
    if (status !== "Completed") {
      return res
        .status(400)
        .json({ success: true, message: "Task is not completed yet" });
    }

    if (task.status === "Completed") {
      return res.status(400).json({ success: true, message: `Task ${status}` });
    }
  } catch (error) {
    //@ts-ignore
    return res.status(500).json({ message: "Internal server error" });
  }
};

// show all tasks which assigned by current admin
const showAllTasks = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const tasks = await Task.find({ createdBy: req.user.id }).populate(
      "assignedTo"
    );
    //@ts-ignore
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    //@ts-ignore
    return res.status(500).json({ message: "Internal server error" });
  }
};

// fetch all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      superuser: false,
      //@ts-ignore
      _id: { $ne: req.user.id },
    });

    if (!users) {
      return res.status(400).json({ message: "No users found" });
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Invalid user" });
    }

    //@ts-ignore
    if (req.user.id == userId) {
      return res.status(400).json({ message: "Cannot delete own account" });
    }

    // find user by id
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  makeAdmin,
  addTask,
  removeTask,
  updateTask,
  showAllTasks,
  getAllUsers,
  deleteUser,
};
