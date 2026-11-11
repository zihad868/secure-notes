import bcrypt from "bcryptjs";
import { User } from "../../schema/user.models";

const SUPER_ADMIN = {
  name: "Admin",
  email: "admin@gmail.com",
  password: "123456",
} as const;


export const initiateSuperAdmin = async (): Promise<void> => {
  const existingSuperAdmin = await User.findOne({ email: SUPER_ADMIN.email }).select("_id role");

  if (existingSuperAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(SUPER_ADMIN.password, 12);

  await User.create({
    name: SUPER_ADMIN.name,
    email: SUPER_ADMIN.email,
    password: hashedPassword,
    role: "ADMIN",
  });
};
