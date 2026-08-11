import { AuthLayout } from "@/components/common/auth-layout.tsx";
import { Link } from "react-router-dom";
import ForgetPasswordForm from "./components/form.tsx";

function ForgetPassword() {
  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold">Forget password</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your Email or username to Reset your Password.
        </p>
      </div>
      <ForgetPasswordForm />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Sign in to your account?{" "}
        <Link
          to="/sign-in"
          className="font-semibold text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}

export default ForgetPassword;
