export interface ICreateUserPayload {
  name?: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  interests?: string[];
}

export interface IUpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: "user" | "admin";
  interests?: string[];
}
