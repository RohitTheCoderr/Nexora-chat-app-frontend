import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/common/app-layout.tsx";

export default function Friends() {
  return (
    <AppLayout title="Friends" subtitle="Explore friends">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Tabs */}
        <div className="my-6 overflow-x-auto">
          <div className="inline-flex min-w-full rounded-full bg-muted p-1 sm:min-w-0">
            <NavLink
              to="all"
              className={({ isActive }) =>
                cn(
                  "shrink-0 rounded-full px-3 flex items-center sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              All friends
            </NavLink>

            <NavLink
              to="non-friends"
              className={({ isActive }) =>
                cn(
                 "shrink-0 rounded-full px-3 flex items-center sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              Non friends
            </NavLink>

            <NavLink
              to="requests"
              className={({ isActive }) =>
                cn(
                 "shrink-0 rounded-full px-3 flex items-center sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              Requests
            </NavLink>

            <NavLink
              to="sended/requests"
              className={({ isActive }) =>
                cn(
                  "shrink-0 rounded-full px-3 flex items-center sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              Sent requests
            </NavLink>
          </div>
        </div>

        <Outlet />
      </div>
    </AppLayout>
  );
}
