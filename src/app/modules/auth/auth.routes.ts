import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middlewares/auth";

const router = Router();


router.post("/register", AuthController.register);

router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);

router.get("/profile", auth(), AuthController.getProfile);

export default router;
