import { AppLayout } from "@/components/common/app-layout.tsx";
import { AccountSection } from "./components/account-section.tsx";
import { AppearanceSection } from "./components/appearance-section.tsx";
import { DangerSection } from "./components/danger-section.tsx";
import { NotificationsSection } from "./components/notifications-section.tsx";
import { PrivacySection } from "./components/privacy-section.tsx";
import { SecuritySection } from "./components/security-section.tsx";

function Settings() {
  return (
    <AppLayout title="Settings" subtitle="Account, privacy and appearance">
      <div className="mx-auto max-w-3xl space-y-5">
        <AccountSection />
        <PrivacySection />
        <NotificationsSection />
        <AppearanceSection />
        <SecuritySection />
        <DangerSection />
      </div>
    </AppLayout>
  );
}

export default Settings;
