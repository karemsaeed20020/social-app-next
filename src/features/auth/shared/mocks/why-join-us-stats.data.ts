import { Heart, LucideIcon, MessageCircle, Users } from "lucide-react";

interface Stat {
  key: string;
  icon: LucideIcon;
  value: string;
}

export const STATS: Stat[] = [
  { key: "users", icon: Users, value: "2M+" },
  { key: "posts", icon: Heart, value: "10M+" },
  { key: "messages", icon: MessageCircle, value: "50M+" },
];
