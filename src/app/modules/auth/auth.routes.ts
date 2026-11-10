import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

// Register user
router.post("/register", AuthController.register);

export default router;

