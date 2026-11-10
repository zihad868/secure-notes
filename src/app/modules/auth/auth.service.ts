import bcrypt from "bcryptjs";
import { User } from "../../schema/user.models";
import { IRegisterPayload } from "./auth.interface";

const SALT_ROUNDS = 12;

const register = async (payload: IRegisterPayload) => {
  const { name, email, password, interests } = payload;

  // Check if the email is already exist or not
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  //  Hash the password for security
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create the user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    interests: interests ?? [],
    role: "user",
  });

  return newUser;
};

export const AuthService = { register };

