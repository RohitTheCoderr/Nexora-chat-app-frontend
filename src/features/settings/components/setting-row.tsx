import type { ReactNode } from "react";
import { Switch } from "@/components/ui/switch.tsx";

type SettingRowProps = {
  label: string;
  hint: string;
  control: ReactNode;
};

export function SettingRow({ label, hint, control }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl px-1 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

type SettingToggleProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

export function SettingToggle({ checked, onChange, label }: SettingToggleProps) {
  return (
    <Switch
      checked={checked}
      onCheckedChange={onChange}
      aria-label={label}
    />
  );
}
