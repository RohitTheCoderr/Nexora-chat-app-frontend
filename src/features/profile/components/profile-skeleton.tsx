import { Skeleton } from "@/components/ui/skeleton";

function ProfileSkeleton() {
  return (
    <div className=" mx-auto max-w-3xl space-y-6 rounded-2xl border border-border bg-surface">
        <Skeleton className="h-28 w-full mb-4 rounded-b-none" />
      <div className="md:flex items-baseline justify-between gap-4 p-2 ">
      <div className="flex items-center gap-4 p-2 ">

        <Skeleton className="h-20 w-20 rounded-xl" />

        <div className="flex-1 space-y-3 ">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-40" />
        </div>
      </div>

      <div className=" flex-1 my-4 grid gap-4 grid-cols-2 p-2">
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
      </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton