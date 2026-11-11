import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validation";

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = registerSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const user = await AuthService.register(parsed.data.body);

    res.status(201).json({
      success: true,
      message: "Account registered successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const result = await AuthService.login(parsed.data.body);

    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.user?.email;
    if (!email) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const profile = await AuthService.getProfile(email);

    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully.",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  register,
  login,
  getProfile,
};
