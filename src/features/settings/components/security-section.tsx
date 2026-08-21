import { Laptop, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { LogoutButton } from "@/components/common/logout-pop-up.tsx";
import { SettingRow } from "./setting-row.tsx";
import { SettingsDivider, SettingsSection } from "./settings-section.tsx";

const sessions = [
  { icon: Laptop, device: "MacBook Pro · Chrome", meta: "Mumbai, IN · Active now", current: true },
  { icon: Smartphone, device: "iPhone 15 · Nexora iOS", meta: "Mumbai, IN · 2 hours ago", current: false },
  { icon: Monitor, device: "Windows PC · Edge", meta: "Pune, IN · 3 days ago", current: false },
];

export function SecuritySection() {
  return (
    <SettingsSection title="Security" description="Sessions currently signed in to your account.">
      {sessions.map((session, index) => (
        <div key={session.device}>
          {index ? <SettingsDivider /> : null}
          <div className="flex items-center gap-3 py-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
              <session.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {session.device}
                {session.current ? <span className="ml-2 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">This device</span> : null}
              </p>
              <p className="truncate text-xs text-muted-foreground">{session.meta}</p>
            </div>
            {!session.current ? <Button variant="ghost" size="sm" className="rounded-xl">Revoke</Button> : null}
          </div>
        </div>
      ))}
      <SettingsDivider />
      <SettingRow label="Sign out" hint="End the session on this device" control={<LogoutButton />} />
    </SettingsSection>
  );
}
