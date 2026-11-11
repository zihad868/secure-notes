import { User } from "../../../schema/user.models";

const getAllUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 });
  return users;
};

export const UserService = {
  getAllUsers,
};

