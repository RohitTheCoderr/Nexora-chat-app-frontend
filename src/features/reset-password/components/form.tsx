import {
  PasswordField,
  PasswordStrength,
} from "@/components/common/password-field.tsx";
import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { resetPasswordApi } from "../api/index.ts";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import type { AxiosError } from "axios";

const resetSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetSchemaType = z.infer<typeof resetSchema>;

function ResetForm() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetSchemaType>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (response) => {
      toast.success(response.message ?? "Password reset successfully");
      navigate("/sign-in");
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(
        error.response?.data?.message ??
          error.message ??
          "Something went wrong. Please try again.",
      );
    },
  });

  const onSubmit = (value: ResetSchemaType) => {
    if (!token) {
      toast.error("Invalid reset link");
      return;
    }
    const payload = { newPassword: value.newPassword };

    resetPassword({ token, payload });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* New Password */}
      <div>
        <PasswordField
          id="new-password"
          label="Password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(value) =>
            setValue("newPassword", value, {
              shouldValidate: true,
            })
          }
        />

        <PasswordStrength value={newPassword} />

        {errors.newPassword && (
          <p className="mt-1 text-xs text-destructive">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <PasswordField
          id="confirm-password"
          label="Confirm password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(value) =>
            setValue("confirmPassword", value, {
              shouldValidate: true,
            })
          }
          error={errors.confirmPassword?.message}
        />
      </div>

      <Button type="submit" className="mt-6 h-11 w-full" disabled={isPending}>
        {isPending ? "Resetting..." : "Reset"}
      </Button>
    </form>
  );
}

export default ResetForm;
