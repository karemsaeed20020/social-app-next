import { User } from "@/features";
import Cookies from "js-cookie";

export const getUserData = () => {
  const token = Cookies.get("token") || null;
  const userRaw = Cookies.get("user");
  const user: User | null = userRaw ? JSON.parse(userRaw) : null;

  return { token, user };
};
