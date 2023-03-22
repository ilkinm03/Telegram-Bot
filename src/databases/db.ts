import mongoose from "mongoose";
import { EnvConfig } from "../config/env.config";

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

mongoose.connection.once("connected", () => {
  console.log("Mongo connected!");
}).on("disconnected", () => {
  console.log("Mongo disconnected!");
});

export const mongoConnection = async () => {
  try {
    await mongoose.connect(EnvConfig.mongoURI!);
  } catch (error) {
    throw error;
  }
};