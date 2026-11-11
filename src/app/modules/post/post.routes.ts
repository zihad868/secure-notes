import { Router } from "express";
import { PostController } from "./post.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

//  Create post 
router.post("/", auth(), PostController.createPost);

// Get public posts (public endpoint - no auth required)
router.get("/", PostController.getPublicPosts);

// Get my posts (requires login)
router.get("/my-posts", auth(), PostController.getMyPosts);

// Get admin posts (admin only)
router.get("/admin/all-posts", auth("ADMIN"), PostController.getAdminPosts);

// Admin delete post (admin only - can delete any user's post)
router.delete("/admin/:id", auth("ADMIN"), PostController.adminDeletePost);

// Get single post by ID (public)
router.get("/:id", PostController.getSinglePost);

// Update post (user updates their own post - supports PATCH & PUT)
router.patch("/:id", auth(), PostController.updatePost);

// Delete post (user soft-deletes their own post)
router.delete("/:id", auth(), PostController.deleteMyPost);

export default router;

