import { Skeleton } from "../ui/skeleton.tsx";

export function FriendSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-2xl border border-border bg-surface p-2"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-24 sm:w-32" />
              <Skeleton className="h-3 w-20 sm:w-24" />
            </div>
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-7 w-16 sm:w-24 rounded-lg" />
            <Skeleton className="h-7 w-16 sm:w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}