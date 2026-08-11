import { AuthLayout } from "@/components/common/auth-layout.tsx";
import { Link } from "react-router-dom";
import ResetForm from "./components/form.tsx";

function ResetPassword() {
  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold">Create new password</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your new password.
        </p>
      </div>

      <ResetForm />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Re-send link on email{" "}
        <Link
          to="/forgot-password"
          className="font-semibold text-primary hover:underline"
        >
          Re-send
        </Link>
      </p>
    </AuthLayout>
  );
}

export default ResetPassword;
