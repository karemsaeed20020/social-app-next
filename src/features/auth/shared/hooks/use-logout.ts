"use client";

import { ROUTES, useRouter } from "@/core";
import Cookies from "js-cookie";

export function useLogout() {
  const router = useRouter();

  return () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push(ROUTES.LOGIN);
  };
}
