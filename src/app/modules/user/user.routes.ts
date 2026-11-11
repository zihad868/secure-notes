import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

// GET Get all users for admin
router.get("/", auth("admin"), UserController.getAllUsers);
    
export default router;

