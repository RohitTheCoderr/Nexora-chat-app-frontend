import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { SettingsDivider, SettingsSection } from "./settings-section.tsx";
import { SettingRow } from "./setting-row.tsx";

export function AccountSection() {
  return (
    <SettingsSection title="Account" description="Your identity and sign-in credentials.">
      <SettingRow
        label="Edit profile"
        hint="Name, username, bio and avatar"
        control={
          <Button variant="outline" size="sm" className="rounded-xl" asChild>
            <Link to="/profile">Open</Link>
          </Button>
        }
      />
      <SettingsDivider />
      <SettingRow
        label="Change password"
        hint="Update your sign-in password"
        control={
          <Button variant="outline" size="sm" className="rounded-xl" asChild>
            <Link to="/change-password">Update</Link>
          </Button>
        }
      />
    </SettingsSection>
  );
}
