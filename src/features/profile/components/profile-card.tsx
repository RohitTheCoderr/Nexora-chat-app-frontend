import { UserAvatar } from "@/components/common/user-avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Camera, KeyRound, Pencil } from "lucide-react";

function ProfileCard() {
  return (
    <div>
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
          <div className="bg-canvas-glow h-28" />
          <div className="flex flex-wrap items-end gap-5 px-6 pb-6">
            <div className="-mt-12 shrink-0">
              <div className="relative">
                <UserAvatar
                  user={currentUser}
                  size="xl"
                  className="ring-4 ring-surface"
                />
                <button
                  className="absolute -right-1 -bottom-1 grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-raised transition-transform hover:scale-105"
                  aria-label="Change avatar"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="min-w-0 flex-1 pt-2">
              <h2 className="truncate text-xl font-bold">{currentUser.name}</h2>
              <p className="text-sm text-muted-foreground">
                {currentUser.username}
              </p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {currentUser.bio}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                className="rounded-xl"
                onClick={() => setEditing((e) => !e)}
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" />{" "}
                {editing ? "Close editor" : "Edit profile"}
              </Button>
              <Button variant="outline" className="rounded-xl">
                <KeyRound className="mr-1.5 h-3.5 w-3.5" /> Change password
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {info.map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-soft-foreground">
                <row.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">
                  {row.label}
                </span>
                <span className="block truncate text-sm font-medium">
                  {row.value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
