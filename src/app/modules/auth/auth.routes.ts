import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

// POST /api/v1/auth/register
router.post("/register", AuthController.register);

export default router;

