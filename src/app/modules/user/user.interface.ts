import { UserRole } from "../../../schema/user.models";

export interface ICreateUserPayload {
  name?: string;
  email: string;
  password: string;
  role?: UserRole;
  interests?: string[];
}

export interface IUpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  interests?: string[];
}
