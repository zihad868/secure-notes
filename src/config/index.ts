import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), "./.env") });

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET ,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || "7d",
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
};
