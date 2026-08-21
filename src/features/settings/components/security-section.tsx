import { Laptop, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { LogoutButton } from "@/components/common/logout-pop-up.tsx";
import { SettingRow } from "./setting-row.tsx";
import { SettingsDivider, SettingsSection } from "./settings-section.tsx";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getSessionsApi,
  revokeSessionsApi,
} from "../apis/sessions/index.ts";
import { useState } from "react";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const getDeviceIcon = (device: string) => {
  const value = device.toLowerCase();

  if (value.includes("mobile") || value.includes("phone")) {
    return Smartphone;
  }

  if (value.includes("desktop") || value.includes("pc")) {
    return Monitor;
  }

  return Laptop;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function SecuritySection() {
  const queryClient = useQueryClient();
  const [revokingSessionId, setRevokingSessionId] = useState<string | null>(
  null
);

  const { data, isLoading } = useQuery({
    queryKey: ["user-sessions"],
    queryFn: getSessionsApi,
  });

  const { mutate: revokeSession } = useMutation({
  mutationFn: revokeSessionsApi,

  onMutate: (sessionId) => {
    setRevokingSessionId(sessionId);
  },

  onSuccess: () => {
      toast.success("Session revoked successfully");
      
    queryClient.invalidateQueries({
      queryKey: ["user-sessions"],
    });
  },

  onSettled: () => {
    setRevokingSessionId(null);
  },
 onError: (error: AxiosError<ApiResponse<null>>) => {
  toast.error(error.response?.data?.message || "Something went wrong");
},
});

  const sessions = data?.data || [];

  if (isLoading) {
    return (
      <SettingsSection
        title="Security"
        description="Sessions currently signed in to your account."
      >
        <p className="py-4 text-sm text-muted-foreground">
          Loading sessions...
        </p>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection
      title="Security"
      description="Sessions currently signed in to your account."
    >
      {sessions.map((session, index) => {
        const Icon = getDeviceIcon(session.device);

        return (
          <div key={session.sessionId}>
            {index ? <SettingsDivider /> : null}

            <div className="flex items-center gap-3 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                <Icon className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {session.device} · {session.browser}

                  {session.isCurrent ? (
                    <span className="ml-2 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
                      This device
                    </span>
                  ) : null}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {session.os} · Last active:{" "}
                  {formatDate(session.lastActive)}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  Logged in: {formatDate(session.createdAt)}
                </p>
              </div>

             {!session.isCurrent ? (
  <Button
    variant="ghost"
    size="sm"
    className="rounded-xl"
    disabled={revokingSessionId === session.sessionId}
    onClick={() => revokeSession(session.sessionId)}
  >
    {revokingSessionId === session.sessionId
      ? "Revoking..."
      : "Revoke"}
  </Button>
) : null}
            </div>
          </div>
        );
      })}

      <SettingsDivider />

      <SettingRow
        label="Sign out"
        hint="End the session on this device"
        control={<LogoutButton />}
      />
    </SettingsSection>
  );
}