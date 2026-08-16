import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Camera } from "lucide-react";
import React from "react";

function ProfileForm() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
      <h3 className="text-base font-semibold">Edit profile</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Changes are visible to people you chat with.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="p-name">Name</Label>
          <Input
            id="p-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-username">Username</Label>
          <Input
            id="p-username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="h-11 rounded-xl"
          />
        </div>
        {/* <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="p-bio">Bio</Label>
          <Textarea
            id="p-bio"
            value={form.bio}
            rows={3}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="rounded-xl"
          />
        </div> */}
        <div className="space-y-2">
          <Label htmlFor="p-phone">Phone</Label>
          <Input
            id="p-phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label>Avatar</Label>
          <Button variant="outline" className="h-11 w-full rounded-xl">
            <Camera className="mr-2 h-4 w-4" /> Upload new photo
          </Button>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button
          variant="ghost"
          className="rounded-xl"
          onClick={() => setEditing(false)}
        >
          Cancel
        </Button>
        <Button className="rounded-xl" onClick={() => setEditing(false)}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

export default ProfileForm;
