import bcrypt from "bcryptjs";
import { PipelineStage, Types } from "mongoose";
import { User } from "../../../schema/user.models";
import { Posts } from "../../../schema/post.models";
import { ICreateUserPayload, IUpdateUserPayload } from "./user.interface";

const SALT_ROUNDS = 12;
const withoutPassword = (user: Record<string, unknown>) => {
  const { password: _password, ...safeUser } = user;
  return safeUser;
};

const getAllUsers = async (skip: number, limit: number) => {
  const [users, total] = await Promise.all([
    User.find().sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(),
  ]);
  return { total, users };
};

const createUser = async (payload: ICreateUserPayload) => {
  const user = await User.create({ ...payload, password: await bcrypt.hash(payload.password, SALT_ROUNDS) });
  return withoutPassword(user.toObject() as Record<string, unknown>);
};

const updateUser = async (userId: string, payload: IUpdateUserPayload) => {
  const update = { ...payload } as Record<string, unknown>;
  if (update.password) update.password = await bcrypt.hash(String(update.password), SALT_ROUNDS);
  const user = await User.findByIdAndUpdate(userId, { $set: update }, { new: true, runValidators: true }).lean();
  if (!user) throw new Error("User not found.");
  return withoutPassword(user as Record<string, unknown>);
};

const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId).lean();
  if (!user) throw new Error("User not found.");
  return withoutPassword(user as Record<string, unknown>);
};


const getUserWithPosts = async (userId: string, skip: number, limit: number) => {
  const objectId = new Types.ObjectId(userId);
  const [[result], total] = await Promise.all([
    User.aggregate([
    { $match: { _id: new Types.ObjectId(userId) } },
    { $lookup: { from: "posts", let: { userId: "$_id" }, pipeline: [
      { $match: { $expr: { $and: [{ $eq: ["$owner", "$$userId"] }, { $eq: ["$isDeleted", false] }] } } },
      { $sort: { _id: -1 } }, { $skip: skip }, { $limit: limit },
    ], as: "posts" } },
    { $project: { _id: 1, name: 1, email: 1, role: 1, interests: 1, posts: 1 } },
    ]),
    Posts.countDocuments({ owner: objectId, isDeleted: false }),
  ]);
  if (!result) throw new Error("User not found.");
  return { ...result, total };
};


const groupUsersByInterest = async (skip: number, limit: number) => {
  const pipeline: PipelineStage[] = [
    { $match: { interests: { $exists: true, $ne: [] } } },
    { $unwind: "$interests" },
    { $group: { _id: "$interests", users: { $push: { _id: "$_id", name: "$name", email: "$email" } }, totalUsers: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ];
  const [groups, interestValues] = await Promise.all([
    User.aggregate([
      ...pipeline,
      { $skip: skip }, { $limit: limit },
      { $project: { _id: 0, interest: "$_id", totalUsers: 1, users: 1 } },
    ]),
    User.distinct("interests", { interests: { $exists: true, $ne: [] } }),
  ]);
  return { groups, total: interestValues.length };
};

export const UserService = { getAllUsers, createUser, updateUser, deleteUser, getUserWithPosts, groupUsersByInterest };
