import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { User } from "../../schema/user.models";
import { IRegisterPayload, ILoginPayload, IJwtPayload } from "./auth.interface";

const SALT_ROUNDS = 12;

const register = async (payload: IRegisterPayload) => {
  const { name, email, password, interests } = payload;

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("You are already exist");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create the user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    interests: interests ?? [],
    role: "user",
  });

  const userObj = newUser.toObject();


  return {
    name: userObj.name,
    email: userObj.email,
    role: userObj.role,
    interests: userObj.interests,
  };
};

const login = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  // Check if the user exists and include password
  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.password) {
    throw new Error("Invalid email or password.");
  }

  // Verify password with bcrypt
  const isPasswordMatch = await bcrypt.compare(password, user.password as string);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password.");
  }

  // Generate JWT access token
  const jwtPayload: IJwtPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_expires_in,
  } as jwt.SignOptions);

 
  return {
    accessToken,
  };
};

const getProfile = async (email: string) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new Error("User not found.");
  }

  return {
        name: user.name,
        email: user.email,
        role: user.role,
        interests: user.interests,
  };
};

export const AuthService = {
  register,
  login,
  getProfile,
};
