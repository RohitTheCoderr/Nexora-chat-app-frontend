import logo from "@/assets/nexora-logo.png";
import { cn } from "@/lib/utils";

export function NexoraMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-xl bg-primary-soft p-1",
        className,
      )}
    >
      <img
        src={logo}
        alt="Nexora logo"
        width={816}
        height={816}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export function NexoraLogo({
  className,
  showTagline = false,
  size = "md",
}: {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const mark =
    size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const text =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <NexoraMark className={mark} />
      <div className="min-w-0">
        <div className={cn("font-display font-bold tracking-tight", text)}>
          Nex<span className="text-primary">ora</span>
        </div>
        {showTagline ? (
          <p className="truncate text-xs text-muted-foreground">
            Conversations that stay connected.
          </p>
        ) : null}
      </div>
    </div>
  );
}
