import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { UserService } from "./user.service";
import { createUserSchema, updateUserSchema } from "./user.validation";
import { getPagination, getPaginationMeta } from "../../utils/pagination";

const invalidId = (id: string) => !Types.ObjectId.isValid(id);

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const result = await UserService.getAllUsers(skip, limit);
    res.json({ success: true, data: result.users, meta: getPaginationMeta(page, limit, result.total) });
  } catch (error) { next(error); }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createUserSchema.safeParse({ body: req.body });
    if (!parsed.success) { res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors }); return; }
    res.status(201).json({ success: true, data: await UserService.createUser(parsed.data.body) });
  } catch (error) { next(error); }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    if (invalidId(id)) { res.status(400).json({ success: false, message: "Invalid user id." }); return; }
    const parsed = updateUserSchema.safeParse({ body: req.body });
    if (!parsed.success) { res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors }); return; }
    res.json({ success: true, data: await UserService.updateUser(id, parsed.data.body) });
  } catch (error) { next(error); }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    if (invalidId(id)) { res.status(400).json({ success: false, message: "Invalid user id." }); return; }
    res.json({ success: true, data: await UserService.deleteUser(id) });
  } catch (error) { next(error); }
};

const getUserWithPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    if (invalidId(id)) { res.status(400).json({ success: false, message: "Invalid user id." }); return; }
    const { page, limit, skip } = getPagination(req);
    const data = await UserService.getUserWithPosts(id, skip, limit);
    res.json({ success: true, data, meta: { page, limit } });
  } catch (error) { next(error); }
};

const groupUsersByInterest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const data = await UserService.groupUsersByInterest(skip, limit);
    res.json({ success: true, data, meta: { page, limit } });
  } catch (error) { next(error); }
};

export const UserController = { getAllUsers, createUser, updateUser, deleteUser, getUserWithPosts, groupUsersByInterest };
