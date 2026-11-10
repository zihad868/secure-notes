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
  const statusCode =
    err.message.includes("already exists") ? 409 : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
