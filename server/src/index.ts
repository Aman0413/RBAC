import express, { Request, Response } from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string) || 4000;
const app = express();

// start the server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

dbConnect();
// routes
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Ok from server" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
let URL = process.env.CLIENT_URL;
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.CLIENT_URL!,
    ],
    credentials: true,
  })
);

app.use("/api/auth/v1", authRoutes);
app.use("/api/user/v1", userRoutes);
app.use("/api/admin/v1", adminRoutes);
