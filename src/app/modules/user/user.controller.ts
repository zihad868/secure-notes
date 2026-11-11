import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      total: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
};

