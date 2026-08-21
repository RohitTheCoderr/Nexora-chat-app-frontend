import { useState } from "react";
import { SettingsDivider, SettingsSection } from "./settings-section.tsx";
import { SettingRow, SettingToggle } from "./setting-row.tsx";

type NotificationState = {
  messages: boolean;
  requests: boolean;
};

export function NotificationsSection() {
  const [notifications, setNotifications] = useState<NotificationState>({
    messages: true,
    requests: true,
  });

  const toggle = (key: keyof NotificationState) => {
    setNotifications((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <SettingsSection title="Notifications" description="Choose what Nexora should alert you about.">
      <SettingRow label="Message notifications" hint="Push and in-app alerts for new messages" control={<SettingToggle checked={notifications.messages} onChange={() => toggle("messages")} label="Message notifications" />} />
      <SettingsDivider />
      <SettingRow label="Friend request notifications" hint="Get notified about new requests" control={<SettingToggle checked={notifications.requests} onChange={() => toggle("requests")} label="Friend request notifications" />} />
    </SettingsSection>
  );
}
