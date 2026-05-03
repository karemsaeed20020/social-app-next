import { User } from "./user";

export interface AuthResponse {
  data?: { token: string; user: User };
  message: string;
  error?: string;
}
