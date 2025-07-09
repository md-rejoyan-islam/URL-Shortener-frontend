import AuthCardFooter from "@/components/auth/auth-card-footer";
import AuthCardHeader from "@/components/auth/auth-card-header";
import AuthCardShape from "@/components/auth/auth-card-shape";
import RegisterForm from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - LinkSnip",
  description: "Register for a new account",
};

const RegisterPage = () => {
  return (
    <AuthCardShape>
      {/* Header Section */}
      <AuthCardHeader
        title="Create an account"
        subTitle="Enter your information to create a LinkSnip account"
      />

      {/* register Form */}
      <RegisterForm />
      {/* Sign in Link */}
      <AuthCardFooter
        label="Already have an account?"
        linkText="Sign in"
        link="/login"
      />
    </AuthCardShape>
  );
};

export default RegisterPage;
