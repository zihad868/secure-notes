import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { registerSchema } from "./auth.validation";

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

export const AuthController = { register };

