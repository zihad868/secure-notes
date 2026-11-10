import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let server: Server;

async function main() {
  try {
    if (!config.database_url) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }

    await mongoose.connect(config.database_url);
    console.log("MongoDB connected successfully");

    server = app.listen(config.port, () => {
      console.log(`Secure notes server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

// Handle unhandled rejections and graceful shutdown
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection detected, shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully...");
  if (server) {
    server.close();
  }
});

// Call server bootstrap
main();
