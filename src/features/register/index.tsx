import { AuthLayout } from "@/components/common/auth-layout.tsx";
import {
  PasswordField,
  PasswordStrength,
  scorePassword,
} from "@/components/common/password-field.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils.ts";
import { Camera, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
const taken = ["mohan", "sohan"];
function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const usernameState = !form.username
    ? "empty"
    : form.username.length < 3
      ? "short"
      : taken.includes(form.username.toLowerCase())
        ? "taken"
        : "available";

  const mismatch = form.confirm.length > 0 && form.confirm !== form.password;
  const valid =
    form.name.trim().length > 1 &&
    usernameState === "available" &&
    /\S+@\S+\.\S+/.test(form.email) &&
    scorePassword(form.password) >= 2 &&
    !mismatch &&
    form.confirm.length > 0 &&
    accepted;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    window.setTimeout(() => Navigate({ to: "/" }), 1000);
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold">Create your account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A few details and your first conversation is one click away.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-5" noValidate>
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
          <div className="relative">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
              <Camera className="h-5 w-5" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">Profile photo</p>
            <p className="text-xs text-muted-foreground">
              PNG or JPG, up to 2 MB. Optional.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 rounded-lg"
            >
              Upload photo
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Ada Lovelace"
            className="h-11 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
              @
            </span>
            <Input
              id="username"
              value={form.username}
              onChange={(e) =>
                set("username")(e.target.value.replace(/[^a-zA-Z0-9._]/g, ""))
              }
              placeholder="ada"
              className={cn(
                "h-11 rounded-xl pl-7",
                usernameState === "taken" && "border-destructive",
                usernameState === "available" && "border-success",
              )}
            />
          </div>
          {usernameState === "taken" ? (
            <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
              <XCircle className="h-3.5 w-3.5" /> That username is taken
            </p>
          ) : usernameState === "available" ? (
            <p className="flex items-center gap-1.5 text-xs font-medium text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> Username is available
            </p>
          ) : usernameState === "short" ? (
            <p className="text-xs text-muted-foreground">
              At least 3 characters.
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="you@nexora.app"
            className="h-11 rounded-xl"
          />
        </div>

        <div>
          <PasswordField
            id="new-password"
            label="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={set("password")}
          />
          <PasswordStrength value={form.password} />
        </div>

        <PasswordField
          id="confirm-password"
          label="Confirm password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={set("confirm")}
          error={mismatch ? "Passwords don't match" : undefined}
        />

        <label className="flex cursor-pointer items-start gap-2.5 text-sm">
          <Checkbox
            checked={accepted}
            onCheckedChange={(v) => setAccepted(Boolean(v))}
            className="mt-0.5"
          />
          <span className="text-muted-foreground">
            I agree to the{" "}
            <span className="font-medium text-foreground">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-medium text-foreground">Privacy Policy</span>.
          </span>
        </label>

        <Button
          type="submit"
          className="h-11 w-full rounded-xl"
          disabled={!valid || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
              account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already on Nexora?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
