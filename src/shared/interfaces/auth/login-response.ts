export interface LoginResponse {
  ok: boolean;
  message: string;
  user: Admin;
  token: string;
}

export interface Admin {
  id: number;
  email: string
}

