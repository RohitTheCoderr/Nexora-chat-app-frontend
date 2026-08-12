import { cn } from "@/lib/utils.ts";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid place-items-center px-6 py-14 text-center",
        className,
      )}
    >
      <div className="max-w-xs">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-primary-soft text-primary-soft-foreground">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-base font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {action ? (
          <div className="mt-5 flex justify-center">{action}</div>
        ) : null}
      </div>
    </div>
  );
}
