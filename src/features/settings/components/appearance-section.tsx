import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { useTheme } from "@/components/common/theme-toggle.tsx";
import { SettingsSection } from "./settings-section.tsx";

export function AppearanceSection() {
  const { theme, setTheme } = useTheme();

  return (
    <SettingsSection title="Appearance" description="Nexora adapts to how you like to work.">
      <div className="grid gap-3 sm:grid-cols-2">
        {(["light", "dark"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setTheme(mode)}
            aria-pressed={theme === mode}
            className={cn(
              "rounded-2xl border p-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              theme === mode ? "border-primary bg-primary-soft" : "border-border hover:bg-muted",
            )}
          >
            <span className="flex items-center gap-2 text-sm font-semibold capitalize">
              {mode === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {mode} mode
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              {mode === "light" ? "Warm neutral canvas, white surfaces" : "Deep neutral canvas, calm contrast"}
            </span>
            <span className={cn("mt-3 flex h-10 items-center gap-1.5 rounded-xl border border-border px-2", mode === "light" ? "bg-white" : "bg-neutral-900")}>
              <span className="h-4 w-4 rounded-full bg-primary" />
              <span className={cn("h-2 w-16 rounded-full", mode === "light" ? "bg-neutral-200" : "bg-neutral-700")} />
            </span>
          </button>
        ))}
      </div>
    </SettingsSection>
  );
}
