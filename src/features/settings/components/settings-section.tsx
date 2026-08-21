import type { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-5 space-y-1">{children}</div>
    </section>
  );
}

export function SettingsDivider() {
  return <div className="h-px bg-border" />;
}
