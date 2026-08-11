import { AuthLayout } from "@/components/common/auth-layout.tsx";
import { Link } from "react-router-dom";
import SignInForm from "./components/form.tsx";

function SignIn() {
  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold">Welcome back</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign In to your account to continue your conversation.
        </p>
      </div>
      <SignInForm />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignIn;
