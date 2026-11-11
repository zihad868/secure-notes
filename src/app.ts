import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./app/routes";

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// ── Routes ───────────────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to the Secure Notes API" });
});

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy, So far so good!" });
});

app.use("/api/v1", router);

// ── Global Error Handler ─────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  if (err.message.includes("already exists") || err.name === "MongoServerError" && (err as Error & { code?: number }).code === 11000) {
    statusCode = 409;
  } else if (
    err.message.includes("Invalid email or password") ||
    err.message.includes("Unauthorized") ||
    err.message.includes("refresh token")
  ) {
    statusCode = 401;
  } else if (err.message.includes("Forbidden") || err.message.includes("not authorized")) {
    statusCode = 403;
  } else if (err.message.includes("not found")) {
    statusCode = 404;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
