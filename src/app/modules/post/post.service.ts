import { Posts } from "../../../schema/post.models";
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface";

// Create post 
const createPost = async (userId: string, payload: ICreatePostPayload) => {
  const newPost = await Posts.create({
    title: payload.title,
    content: payload.content ?? "",
    owner: userId,
    isPublic: payload.isPublic ?? true,
    isDeleted: false,
  });

  return newPost;
};

// Get public posts 
const getPublicPosts = async () => {
  const posts = await Posts.find({ isPublic: true, isDeleted: false })
    .populate("owner", "name email")
    .sort({ _id: -1 });

  return posts;
};

//  Get my posts 
const getMyPosts = async (userId: string) => {
  const posts = await Posts.find({ owner: userId, isDeleted: false })
    .populate("owner", "name email")
    .sort({ _id: -1 });

  return posts;
};

//  Get admin posts 
const getAdminPosts = async () => {
  const posts = await Posts.find()
    .populate("owner", "name email role")
    .sort({ _id: -1 });

  return posts;
};

// Get single post by ID
const getSinglePost = async (postId: string) => {
  const post = await Posts.findOne({ _id: postId, isDeleted: false })
    .populate("owner", "name email");

  if (!post) {
    throw new Error("Post not found.");
  }

  return post;
};

// Update post (user updates their own post)
const updatePost = async (
  userId: string,
  postId: string,
  payload: IUpdatePostPayload
) => {
  const updatedPost = await Posts.findOneAndUpdate(
    { _id: postId, owner: userId, isDeleted: false },
    { $set: payload },
    { returnDocument: "after", runValidators: true }
  );

  if (!updatedPost) {
    throw new Error("Post not found or you are not authorized to update it.");
  }

  return updatedPost;
};

// Delete post (user soft-deletes their own post)
const deleteMyPost = async (userId: string, postId: string) => {
  const deletedPost = await Posts.findOneAndUpdate(
    { _id: postId, owner: userId, isDeleted: false },
    { isDeleted: true },
    { returnDocument: "after" }
  );

  if (!deletedPost) {
    throw new Error("Post not found or you are not authorized to delete it.");
  }

  return deletedPost;
};

// Admin delete post (admin can delete any user's post)
const adminDeletePost = async (postId: string) => {
  const deletedPost = await Posts.findOneAndUpdate(
    { _id: postId, isDeleted: false },
    { isDeleted: true },
    { returnDocument: "after" }
  );

  if (!deletedPost) {
    throw new Error("Post not found or already deleted.");
  }

  return deletedPost;
};

export const PostService = {
  createPost,
  getPublicPosts,
  getMyPosts,
  getAdminPosts,
  getSinglePost,
  updatePost,
  deleteMyPost,
  adminDeletePost,
};

