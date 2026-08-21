import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Camera, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { profile } from "../apis/get-profile/type.ts";
import { useDebounce } from "@/features/register/hooks/useDebounce.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkUsername } from "@/features/register/api/check-username.ts";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { createProfileApi } from "../apis/create-profile/index.ts";
import { toast } from "sonner";
import type { AxiosError } from "axios";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name is too long"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username is too long"),

  bio: z.string().max(160, "Bio cannot exceed 160 characters").optional(),

  phone: z.string().max(15, "Phone number is too long").optional(),

  avatar: z.instanceof(File).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileFormProps = {
  profile: profile;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProfileForm({ profile, setEditing }: ProfileFormProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    profile.avatar.url ?? "",
  );

  const handleAvatarChange = (file?: File) => {
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      return;
    }

    setValue("avatar", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview((oldPreview) => {
      if (oldPreview.startsWith("blob:")) {
        URL.revokeObjectURL(oldPreview);
      }

      return previewUrl;
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name ?? "",
      username: profile.username ?? "",
      bio: profile.bio ?? "",
      phone: profile.phone ?? "",
    },
  });

  const username = watch("username");

  const debouncedUsername = useDebounce(username, 500);

  const isCurrentUsername =
    debouncedUsername.toLowerCase() === profile.username.toLowerCase();

  const usernameQuery = useQuery({
    queryKey: ["username-availability", debouncedUsername],

    queryFn: () => checkUsername(debouncedUsername),

    enabled: debouncedUsername.length >= 3 && !isCurrentUsername,

    staleTime: 30 * 1000,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createProfileApi,
    onSuccess: (response) => {
      toast.success(response.message || "Profile updated");

      queryClient.invalidateQueries({
        queryKey: ["user-profile-data"],
      });

      setEditing(false);
    },

    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data?.message ?? error.message);
    },
  });

  const usernameAvailable =
    debouncedUsername.length >= 3 &&
    !isCurrentUsername &&
    usernameQuery.data?.data?.available === true;

  const usernameTaken =
    debouncedUsername.length >= 3 &&
    !isCurrentUsername &&
    usernameQuery.data?.data?.available === false;

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("bio", data.bio ?? "");
    formData.append("phone", data.phone ?? "");

    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }

    mutate(formData);

    setEditing(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 mt-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl border border-border bg-surface p-6 shadow-soft"
      >
        <h3 className="text-base font-semibold">Edit profile</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Changes are visible to people you chat with.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="p-name">Name</Label>

            <Input
              id="p-name"
              className="h-11 rounded-xl"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>

            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                @
              </span>

              <Input
                id="username"
                placeholder="username"
                className={cn(
                  "h-11 rounded-xl pl-7",
                  usernameTaken && "border-destructive",
                  usernameAvailable && "border-success",
                )}
                {...register("username", {
                  onChange: (e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9._]/g, "");

                    setValue("username", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  },
                })}
              />
            </div>

            {/* Checking */}
            {usernameQuery.isFetching && debouncedUsername.length >= 3 && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Checking username...
              </p>
            )}

            {/* Available */}
            {!usernameQuery.isFetching && usernameAvailable && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Username is available
              </p>
            )}

            {/* Taken */}
            {!usernameQuery.isFetching && usernameTaken && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                <XCircle className="h-3.5 w-3.5" />
                That username is already taken
              </p>
            )}

            {/* Validation */}
            {errors.username && !usernameTaken && (
              <p className="text-xs text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="p-phone">Phone</Label>

            <Input
              id="p-phone"
              className="h-11 rounded-xl"
              {...register("phone")}
            />

            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="p-bio">Bio</Label>

            <Textarea
              id="p-bio"
              rows={4}
              className="rounded-xl"
              {...register("bio")}
            />

            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>

          {/* Avatar */}
          {/* Avatar */}
          <div className="space-y-2">
            <Label>Avatar</Label>

            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
              {/* Preview */}
              <div className="relative shrink-0">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile preview"
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
                    <Camera className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold">Profile photo</p>

                <p className="text-xs text-muted-foreground">
                  PNG or JPG, up to 2 MB. Optional.
                </p>

                {/* Hidden file input */}
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    handleAvatarChange(e.target.files?.[0]);
                  }}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 rounded-lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload photo
                </Button>
              </div>
            </div>

            {errors.avatar && (
              <p className="text-xs text-destructive">
                {errors.avatar.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            className="rounded-xl"
            onClick={() => setEditing(false)}
            disabled={isPending || usernameQuery.isFetching || usernameTaken}
          >
            Cancel
          </Button>

          <Button type="submit" className="rounded-xl" disabled={isPending}>
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
