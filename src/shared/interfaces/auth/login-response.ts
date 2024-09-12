import { User } from "../app/user.interface";

export interface LoginResponse {
  ok: boolean;
  message: string;
  user: User;
  token: string;
}

