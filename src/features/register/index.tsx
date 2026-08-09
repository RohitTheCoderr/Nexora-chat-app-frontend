import { AuthLayout } from "@/components/common/auth-layout.tsx";
import { Link } from "react-router-dom";
import RegisterForm from "./components/form.tsx";
function RegisterPage() {
  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold">Create your account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A few details and your first conversation is one click away.
        </p>
      </div>
      <RegisterForm />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already on Nexora?{" "}
        <Link
          to="/sign-in"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
