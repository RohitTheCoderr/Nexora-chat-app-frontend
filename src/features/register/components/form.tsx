import {
  PasswordField,
  PasswordStrength,
} from "@/components/common/password-field.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { checkUsername } from "../api/check-username.ts";
import { registerSchema, type RegisterFormData } from "../schema.ts";
import { useDebounce } from "../hooks/useDebounce.ts";
import { useRegister } from "../hooks/useRegister.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function RegisterForm() {
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm: "",
      accepted: false,
    },
    mode: "onSubmit",
  });

  const username = registerForm.watch("username");

  const debouncedUsername = useDebounce(username, 500);

  const usernameQuery = useQuery({
    queryKey: ["username-availability", debouncedUsername],

    queryFn: () => checkUsername(debouncedUsername),

    enabled: debouncedUsername.length >= 3,

    staleTime: 30 * 1000,
  });

  const usernameAvailable =
    debouncedUsername.length >= 3 &&
    usernameQuery.data?.data?.available === true;

  const usernameTaken =
    debouncedUsername.length >= 3 &&
    usernameQuery.data?.data?.available === false;

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);

    // Later:
    registerMutation.mutate(
      {
        name: data.name.trim(),
        username: data.username.trim().toLowerCase(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message ?? "User registered successfully");
          navigate("/sign-in");
        },

        onError: (error) => {
          toast.error(
            error.message ?? "Registration failed. Please try again.",
          );
        },
      },
    );
  };

  return (
    <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>

        <Input
          id="name"
          placeholder="Your name"
          className="h-11 rounded-xl"
          {...registerForm.register("name")}
        />

        {registerForm.formState.errors.name && (
          <p className="text-xs text-destructive">
            {registerForm.formState.errors.name.message}
          </p>
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
            {...registerForm.register("username", {
              onChange: (e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9._]/g, "");

                registerForm.setValue("username", value);
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
        {registerForm.formState.errors.username && !usernameTaken && (
          <p className="text-xs text-destructive">
            {registerForm.formState.errors.username.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="you@nexora.app"
          className="h-11 rounded-xl"
          {...registerForm.register("email")}
        />

        {registerForm.formState.errors.email && (
          <p className="text-xs text-destructive">
            {registerForm.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <PasswordField
          id="new-password"
          label="Password"
          autoComplete="new-password"
          value={registerForm.watch("password")}
          onChange={(value) =>
            registerForm.setValue("password", value, {
              shouldValidate: true,
            })
          }
        />

        <PasswordStrength value={registerForm.watch("password")} />

        {registerForm.formState.errors.password && (
          <p className="mt-1 text-xs text-destructive">
            {registerForm.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <PasswordField
        id="confirm-password"
        label="Confirm password"
        autoComplete="new-password"
        value={registerForm.watch("confirm")}
        onChange={(value) =>
          registerForm.setValue("confirm", value, {
            shouldValidate: true,
          })
        }
        error={registerForm.formState.errors.confirm?.message}
      />

      {/* Terms */}
      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm">
          <Checkbox
            checked={registerForm.watch("accepted")}
            onCheckedChange={(value) =>
              registerForm.setValue("accepted", Boolean(value), {
                shouldValidate: true,
              })
            }
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

        {registerForm.formState.errors.accepted && (
          <p className="mt-1 text-xs text-destructive">
            {registerForm.formState.errors.accepted.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="h-11 w-full rounded-xl"
        disabled={
          // registerForm.formState.isSubmitting ||
          registerMutation.isPending ||
          usernameQuery.isFetching ||
          usernameTaken
        }
      >
        {/* {registerForm.formState.isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )} */}

        {registerMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}

export default RegisterForm;
