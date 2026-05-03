import { LucideIcon, PostPrivacyType } from "@/shared";
import { Bookmark, FileText, Home, Users } from "lucide-react";

export const FEED_FILTER_DEFAULT = "feed";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  value: PostPrivacyType;
}
export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { id: "feed", label: "Feed", icon: Home, value: "following" },
  { id: "my_posts", label: "My Posts", icon: FileText, value: "me" },
  { id: "community", label: "Community", icon: Users, value: "all" },
  { id: "saved", label: "Saved", icon: Bookmark, value: "saved" },
];
