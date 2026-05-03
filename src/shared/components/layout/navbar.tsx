"use client";

import { cn, Link, ROUTES, usePathname } from "@/core";
import { useGetUnreadCount, useLogout } from "@/features";
import { Bell, Home, LogOut, Menu, Settings, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { useUserData } from "../../hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui";

export function Navbar() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const t = useTranslations("app.nav");
  const { user } = useUserData();
  const pathname = usePathname();
  const logout = useLogout();
  const { data: unreadData } = useGetUnreadCount();

  const unreadCount = mounted ? unreadData?.data?.unreadCount || 0 : 0;
  const currentUser = mounted ? user : null;

  const navItems = [
    { label: t("feed"), href: ROUTES.FEED, icon: Home },
    { label: t("profile"), href: ROUTES.PROFILE, icon: User },
    { label: t("notifications"), href: ROUTES.NOTIFICATIONS, icon: Bell },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2">
        <Link href={ROUTES.FEED} className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} priority />
          <span className="hidden text-lg font-bold sm:block">
            {t("title")}
          </span>
        </Link>

        <nav className="flex items-center gap-1 rounded-lg bg-muted/40 p-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const isNotifications = item.href === ROUTES.NOTIFICATIONS;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
                )}
              >
                {isNotifications && unreadCount > 0 && (
                  <Badge className="absolute top-0 inset-e-0 aspect-square w-5">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Badge>
                )}
                <Icon className="size-4" />
                <span className="hidden sm:block">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser?.photo} alt={currentUser?.name} />
                <AvatarFallback>
                  <User className="size-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-32 truncate text-sm font-medium md:block">
                {currentUser?.name}
              </span>
              <Menu className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 rounded-lg p-2">
            <DropdownMenuItem asChild>
              <Link
                href={ROUTES.PROFILE}
                className="flex items-center gap-3 py-2"
              >
                <User className="size-4" />
                <span>{t("profile")}</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href={ROUTES.SETTINGS}
                className="flex items-center gap-3 py-2"
              >
                <Settings className="size-4" />
                <span>{t("settings")}</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={() => logout()}
              className="flex items-center gap-3 py-2"
            >
              <LogOut className="size-4" />
              <span>{t("logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
