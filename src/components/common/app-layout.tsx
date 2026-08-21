import {
  Bell,
  ChevronLeft,
  MessageSquare,
  Settings,
  User,
  User2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NexoraLogo, NexoraMark } from "./logo-setup.tsx";
import { Button } from "../ui/button.tsx";
import { cn } from "@/lib/utils.ts";

import { UserAvatar } from "./user-avatar.tsx";
import { ThemeToggle } from "./theme-toggle.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip.tsx";
import { useAuth } from "@/features/sign-in/store/authStore.ts";
import { LogoutButton } from "./logout-pop-up.tsx";
import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationCount } from "@/shared/global-apis/unread-notification-count.ts";
import { Badge } from "../ui/badge.tsx";

export function AppLayout({
  children,
  title,
  subtitle,
  actions,
  padded = true,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  padded?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { userData } = useAuth();

  const { data: unreadNotificationData } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: getUnreadNotificationCount,
  });

  const unreadCount = unreadNotificationData?.data?.count ?? 0;

  const avatarUser = {
    userId: userData?.userId,
    name: userData?.name ?? "",
    username: userData?.username,
    avatar: userData?.avatar,
    status: userData?.status,
  };

  const presence = userData?.status;

  const nav: {
    to: string;
    label: string;
    icon: typeof Users;
    badge?: number;
  }[] = [
    { to: "/", label: "Chats", icon: MessageSquare, badge: 3 },
    {
      to: "/notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadCount,
    },
    { to: "/friends", label: "Friends", icon: Users },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <aside
          className={cn(
            "hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 md:flex",
            collapsed ? "w-[80px]" : "w-[248px]",
          )}
        >
          <div className="flex h-16 items-center justify-between gap-1 px-2">
            {collapsed ? (
              <NexoraMark className="h-9 w-9" />
            ) : (
              <NexoraLogo size="sm" />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 cursor-pointer z-10"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform",
                  collapsed && "rotate-180",
                )}
              />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-3">
            {nav.map((item) => {
              const active =
                pathname === item.to || pathname.startsWith(`${item.to}/`);
              const link = (
                <Link
                  to={item.to}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center px-0",
                  )}
                >
                  {active ? (
                    <span className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                  ) : null}
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed ? (
                    <span className="truncate">{item.label}</span>
                  ) : null}
                  {!collapsed && item.badge && item.badge > 0 ? (
                    <Badge className="ml-auto h-5 w-5 justify-center rounded-full px-1.5 text-[11px]">
                      {item.badge}
                    </Badge>
                  ) : null}
                </Link>
              );
              return collapsed ? (
                <Tooltip key={item.to}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              ) : (
                <div key={item.to}>{link}</div>
              );
            })}
          </nav>

          <div className="border-t border-sidebar-border p-3">
            <div
              className={cn(
                "flex items-center gap-3 rounded-2xl p-2",
                collapsed ? "justify-center" : "bg-muted/60",
              )}
            >
              <Link to="/profile" className="shrink-0">
                {userData ? (
                  <UserAvatar
                    user={avatarUser}
                    size="sm"
                    showPresence={presence}
                  />
                ) : (
                  <User2 size={18} />
                )}{" "}
              </Link>
              {!collapsed ? (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {userData?.name ?? "User"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {userData?.username ?? "@username"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    asChild
                  >
                    <Link to="/settings" aria-label="Settings">
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur md:px-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 md:hidden">
                <NexoraLogo size="sm" />
              </div>
              <div className="hidden min-w-0 md:block">
                <h1 className="truncate text-base font-semibold">
                  {title ?? "Nexora"}
                </h1>
                {subtitle ? (
                  <p className="truncate text-xs text-muted-foreground">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>

            {/* <div className="relative hidden w-64 lg:block">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search Nexora"
                className="h-10 rounded-xl border-border bg-muted/60 pl-9"
              />
            </div> */}

            {actions}
            <ThemeToggle className="cursor-pointer" />
            <LogoutButton />
          </header>

          <main
            className={cn(
              "nx-scroll min-w-0 flex-1 overflow-y-auto pb-16 md:pb-0",
              padded && "px-4 py-6 md:px-8 md:py-8",
            )}
          >
            {children}
          </main>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-stretch border-t border-border bg-surface md:hidden">
          {nav.map((item) => {
            // const active = pathname === item.to;
            const active =
              pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
                {item.badge ? (
                  <span className="absolute top-2 right-[22%] h-1.5 w-1.5 rounded-full bg-primary" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </TooltipProvider>
  );
}
