import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default dbConnect;
