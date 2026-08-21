import { UserAvatar } from "@/components/common/user-avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { createProfileApi } from "../apis/create-profile/index.ts";
import {
  Camera,
  Clock,
  KeyRound,
  Mail,
  Pencil,
  Phone,
  Radio,
  Verified,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { profile } from "../apis/get-profile/type.ts";

type profileProps = {
  profile: profile;
  handleEdit: () => void;
  editing: boolean;
};

function ProfileCard({ profile, editing, handleEdit }: profileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate: updateAvatar, isPending: isUploading } = useMutation({
    mutationFn: createProfileApi,
    onSuccess: (response) => {
      toast.success(response.message || "Profile photo updated");
      queryClient.invalidateQueries({ queryKey: ["user-profile-data"] });
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data?.message ?? error.message);
    },
  });

  const handleAvatarChange = (file?: File) => {
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only PNG and JPG images are supported");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile photo must be 2 MB or smaller");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    updateAvatar(formData);
  };

  const currentUser = {
    name: profile.name,
    username: profile.username,
    avatar: profile.avatar,
    status: profile.status,
    userId: profile.userId,
    lastSeen: profile.lastSeen,
  };
  const { email, phone, status, lastSeen, isVerified } = profile ?? {};

  const info = [
    { icon: Mail, label: "Email", value: email },
    { icon: Phone, label: "Phone", value: phone },
    { icon: Radio, label: "Status", value: status },
    {
      icon: Clock,
      label: "Last seen",
      value: lastSeen ? lastSeen : "Not available",
    },
    {
      icon: Verified,
      label: "Verified",
      value: isVerified ? "Verified" : "Not verified",
    },
  ];
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
                  type="button"
                  className="absolute -right-1 -bottom-1 grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-raised transition-transform hover:scale-105"
                  aria-label="Change avatar"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className={isUploading ? "h-4 w-4 animate-pulse" : "h-4 w-4"} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(event) => {
                    handleAvatarChange(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </div>
            </div>
            <div className="min-w-0 flex-1 pt-2">
              <h2 className="truncate text-xl font-bold">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">
                {profile.username}
              </p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {profile.bio}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button className="rounded-xl" onClick={handleEdit}>
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
