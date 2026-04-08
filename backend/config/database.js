import mongoose from "mongoose";
import { db_URI, NODE_ENV } from "./env.js";

let isConnected = false;

if (!db_URI) {
  throw new Error(
    "Missing db_URI in environment file (.env.<environment>.local)"
  );
}

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    mongoose.set("strictQuery", true);
    mongoose.set("bufferCommands", false);

    const conn = await mongoose.connect(db_URI, {
      dbName: "Dooodleee",
    });

    isConnected = true;

    console.log(
      `MongoDB connected: ${conn.connection.host} | DB: ${conn.connection.name} | ENV: ${NODE_ENV}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed. App terminated.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed (SIGTERM).");
  process.exit(0);
});