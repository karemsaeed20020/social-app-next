import Cookies from "js-cookie";
import { User } from "../models";

export const options = {
  expires: 7,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export const saveSession = (token: string, user: User) => {
  if (!token || !user) {
    throw new Error("Invalid auth session");
  }

  Cookies.set("token", token, options);
  Cookies.set("user", JSON.stringify(user), options);
};
