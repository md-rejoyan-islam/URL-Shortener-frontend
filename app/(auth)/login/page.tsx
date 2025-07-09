import AuthCardFooter from "@/components/auth/auth-card-footer";
import AuthCardHeader from "@/components/auth/auth-card-header";
import AuthCardShape from "@/components/auth/auth-card-shape";
import LoginForm from "@/components/auth/login-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - LinkSnip",
  description: "Login to your account",
};

const LoginPage = () => {
  return (
    <AuthCardShape>
      {/* Header Section */}
      <AuthCardHeader
        title="Welcome Back!"
        subTitle="Sign in to your account"
      />

      {/* Login Form */}
      <LoginForm />
      {/* Sign Up Link */}
      <AuthCardFooter
        label="Don't have an account?"
        linkText="Sign up"
        link="/register"
      />
    </AuthCardShape>
  );
};

export default LoginPage;
