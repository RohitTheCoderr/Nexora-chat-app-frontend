import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { profile } from "../apis/get-profile/type.ts";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username is too long"),

  bio: z.string().max(160, "Bio cannot exceed 160 characters").optional(),

  phone: z.string().max(15, "Phone number is too long").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileFormProps = {
  profile: profile;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProfileForm({ profile, setEditing }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name ?? "",
      username: profile.username ?? "",
      bio: profile.bio ?? "",
      phone: profile.phone ?? "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Profile update data:", data);

    // update profile API here

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
            <Label htmlFor="p-username">Username</Label>

            <Input
              id="p-username"
              className="h-11 rounded-xl"
              {...register("username")}
            />

            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="p-bio">Bio</Label>

            <Textarea
              id="p-bio"
              rows={3}
              className="rounded-xl"
              {...register("bio")}
            />

            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
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

          {/* Avatar */}
          <div className="space-y-2">
            <Label>Avatar</Label>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full rounded-xl"
            >
              <Camera className="mr-2 h-4 w-4" />
              Upload new photo
            </Button>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            className="rounded-xl"
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>

          <Button type="submit" className="rounded-xl" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
