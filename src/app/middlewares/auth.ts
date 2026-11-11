import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { IJwtPayload } from "../modules/auth/auth.interface";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
          success: false,
          message: "Unauthorized! Bearer token is missing or malformed.",
        });
        return;
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized! Token not provided.",
        });
        return;
      }

      // Verify token
      const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload & IJwtPayload;

      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! Invalid or expired token.",
      });
    }
  };
};

