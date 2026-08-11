import { z } from "zod";
import { Input } from "@/components/ui/input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PasswordField } from "@/components/common/password-field.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useMutation } from "@tanstack/react-query";
import loginUser from "../api/index.ts";
import { toast } from "sonner";
import { useAuth } from "../store/authStore.ts";
import { Label } from "@/components/ui/label.tsx";
import type { AxiosError } from "axios";

const loginSchema = z.object({
  identifier: z.string().min(2, "Username or email is required"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  remember: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function SignInForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      identifier: "",
      password: "",
      remember: false,
    },

    mode: "onSubmit",
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      if (!response.data) {
        toast.error("Invalid login response");
        return;
      }
      const { token, userData } = response.data;

      setAuth(token, userData);

      toast.success(response.message ?? "Login successful");

      navigate("/");
    },

    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(
        error.response?.data?.message ??
          error.message ??
          "Login failed. Please try again.",
      );
    },
  });
  const onSubmit = (data: LoginFormValues) => {
    const identifier = data.identifier.trim();

    const payload = {
      identifier,
      password: data.password,
    };

    loginMutation.mutate(payload);
  };

  return (
    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-5">
      {/* Username / Email */}
      <div className="space-y-2">
        <Label htmlFor="identifier" className="text-sm font-medium">
          Email or username
        </Label>

        <Input
          id="identifier"
          placeholder="Email or username"
          className="h-11 rounded-xl"
          autoComplete="identifier"
          {...loginForm.register("identifier")}
        />

        {loginForm.formState.errors.identifier && (
          <p className="text-sm text-destructive">
            {loginForm.formState.errors.identifier.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <PasswordField
          id="password"
          label="Password"
          autoComplete="current-password"
          value={loginForm.watch("password")}
          onChange={(value) =>
            loginForm.setValue("password", value, {
              shouldValidate: true,
            })
          }
          error={loginForm.formState.errors.password?.message}
          hint={
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          }
        />
      </div>

      {/* Remember me */}
      <Controller
        name="remember"
        control={loginForm.control}
        render={({ field }) => (
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />

            <span className="text-muted-foreground">
              Remember me on this device
            </span>
          </label>
        )}
      />

      {/* Submit */}
      <Button
        type="submit"
        className="h-11 w-full rounded-xl"
        disabled={loginForm.formState.isSubmitting}
      >
        {loginForm.formState.isSubmitting ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}

export default SignInForm;
