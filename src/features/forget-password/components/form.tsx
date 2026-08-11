import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { forgetPasswordApi } from "../api/index.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

const forgetSchema = z.object({
  identifier: z.string().min(2, "Username or email is required"),
});

type forgetSchemaValues = z.infer<typeof forgetSchema>;

function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgetSchemaValues>({
    resolver: zodResolver(forgetSchema),
    defaultValues: {
      identifier: "",
    },
    mode: "onSubmit",
  });

  const {
    mutate: forgetPassword,

    isPending,
  } = useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: (response) => {
      toast.success(response.message ?? "Reset link sent to your email");
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(
        error.response?.data?.message ??
          error.message ??
          "Something went wrong. Please check on your email.",
      );
    },
  });

  const onSubmit = (data: forgetSchemaValues) => {
    const identifier = data.identifier.trim();

    const payload = {
      identifier,
    };
    forgetPassword(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username / Email */}
      <div className="space-y-2">
        <Label htmlFor="identifier" className="text-sm font-medium">
          Email or username
        </Label>

        <Input
          id="identifier"
          placeholder="Email or username"
          className="h-11 rounded-xl"
          autoComplete="username"
          {...register("identifier")}
        />

        {errors.identifier && (
          <p className="text-sm text-destructive">
            {" "}
            {errors.identifier.message}{" "}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="h-11 w-full rounded-xl mt-6"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}

export default ForgetPasswordForm;
