import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Approved", "Rejected"],
    default: "Pending",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //   completedAt: { type: Date },
  //   approvedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", TaskSchema);
