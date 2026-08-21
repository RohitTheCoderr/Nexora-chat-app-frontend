import { useState } from "react";
import { SettingsDivider, SettingsSection } from "./settings-section.tsx";
import { SettingRow, SettingToggle } from "./setting-row.tsx";

type PrivacyState = {
  online: boolean;
  lastSeen: boolean;
  visibility: boolean;
};

export function PrivacySection() {
  const [privacy, setPrivacy] = useState<PrivacyState>({
    online: true,
    lastSeen: true,
    visibility: true,
  });

  const toggle = (key: keyof PrivacyState) => {
    setPrivacy((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <SettingsSection title="Privacy" description="Decide what others can see about you.">
      <SettingRow label="Show online status" hint="Friends can see when you're active" control={<SettingToggle checked={privacy.online} onChange={() => toggle("online")} label="Show online status" />} />
      <SettingsDivider />
      <SettingRow label="Show last seen" hint="Display your last active time" control={<SettingToggle checked={privacy.lastSeen} onChange={() => toggle("lastSeen")} label="Show last seen" />} />
      <SettingsDivider />
      <SettingRow label="Profile visibility" hint="Only friends can view your full profile" control={<SettingToggle checked={privacy.visibility} onChange={() => toggle("visibility")} label="Profile visibility" />} />
    </SettingsSection>
  );
}
