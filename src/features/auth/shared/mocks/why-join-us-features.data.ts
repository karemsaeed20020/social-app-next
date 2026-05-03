import {
  Bell,
  Image as ImageIcon,
  LucideIcon,
  MessageCircle,
  Users,
} from "lucide-react";

interface Feature {
  key: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export const FEATURES: Feature[] = [
  {
    key: "chat",
    icon: MessageCircle,
    iconColor: "text-rose-700 dark:text-rose-300",
    iconBg: "bg-rose-200/60 dark:bg-rose-500/15",
  },
  {
    key: "media",
    icon: ImageIcon,
    iconColor: "text-red-700 dark:text-red-300",
    iconBg: "bg-red-200/60 dark:bg-red-500/15",
  },
  {
    key: "alerts",
    icon: Bell,
    iconColor: "text-pink-700 dark:text-pink-300",
    iconBg: "bg-pink-200/60 dark:bg-pink-500/15",
  },
  {
    key: "community",
    icon: Users,
    iconColor: "text-fuchsia-700 dark:text-fuchsia-300",
    iconBg: "bg-fuchsia-200/60 dark:bg-fuchsia-500/15",
  },
];
