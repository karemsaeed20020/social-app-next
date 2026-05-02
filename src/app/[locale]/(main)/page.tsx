import { ROUTES } from "@/core";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTES.FEED);
}
