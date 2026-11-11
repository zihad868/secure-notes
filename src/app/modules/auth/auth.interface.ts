export interface IRegisterPayload {
  name?: string;
  email: string;
  password: string;
  interests?: string[];
}

export interface ILoginPayload {
  email: string;
  password: string;
}

import { UserRole } from "../../../schema/user.models";

export interface IJwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

export interface IRefreshTokenPayload {
  id: string;
  tokenType: "refresh";
}
