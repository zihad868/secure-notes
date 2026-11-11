import { Request, Response, NextFunction } from "express";
import { PostService } from "./post.service";
import { createPostSchema, updatePostSchema } from "./post.validation";
import { getPagination, getPaginationMeta } from "../../utils/pagination";

// Create post
const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const parsed = createPostSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const post = await PostService.createPost(userId, parsed.data.body);

    res.status(201).json({
      success: true,
      message: "Post created successfully.",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Get public posts
const getPublicPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page, limit, skip } = getPagination(req);
    const result = await PostService.getPublicPosts(skip, limit);

    res.status(200).json({
      success: true,
      message: "Public posts fetched successfully.",
      data: result.posts,
      meta: getPaginationMeta(page, limit, result.total),
    });
  } catch (error) {
    next(error);
  }
};

// Get my posts
const getMyPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const { page, limit, skip } = getPagination(req);
    const result = await PostService.getMyPosts(userId, skip, limit);

    res.status(200).json({
      success: true,
      message: "My posts fetched successfully.",
      data: result.posts,
      meta: getPaginationMeta(page, limit, result.total),
    });
  } catch (error) {
    next(error);
  }
};

//  Get admin posts (admin only)
const getAdminPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page, limit, skip } = getPagination(req);
    const result = await PostService.getAdminPosts(skip, limit);

    res.status(200).json({
      success: true,
      message: "Admin: all posts fetched successfully.",
      data: result.posts,
      meta: getPaginationMeta(page, limit, result.total),
    });
  } catch (error) {
    next(error);
  }
};

// Get single post
const getSinglePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await PostService.getSinglePost(id as string);

    res.status(200).json({
      success: true,
      message: "Post fetched successfully.",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Update post
const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const parsed = updatePostSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const updatedPost = await PostService.updatePost(
      userId,
      id as string,
      parsed.data.body
    );

    res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// Admin update post (admin can update any post)
const adminUpdatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsed = updatePostSchema.safeParse({ body: req.body });

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const updatedPost = await PostService.adminUpdatePost(
      id as string,
      parsed.data.body
    );

    res.status(200).json({
      success: true,
      message: "Admin: Post updated successfully.",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

//  Delete my post (user soft-deletes their own post)
const deleteMyPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const deletedPost = await PostService.deleteMyPost(userId, id as string);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
};

// Admin delete post (admin can delete any post)
const adminDeletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedPost = await PostService.adminDeletePost(id as string);

    res.status(200).json({
      success: true,
      message: "Admin: Post deleted successfully.",
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const PostController = {
  createPost,
  getPublicPosts,
  getMyPosts,
  getAdminPosts,
  getSinglePost,
  updatePost,
  adminUpdatePost,
  deleteMyPost,
  adminDeletePost,
};
