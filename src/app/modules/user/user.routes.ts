import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.use(auth("ADMIN"));
router.get("/grouped-by-interests", UserController.groupUsersByInterest);
router.get("/:id/posts", UserController.getUserWithPosts);
router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
    
export default router;

