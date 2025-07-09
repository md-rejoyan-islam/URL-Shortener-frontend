"use client";
import SubmitButton from "@/components/auth/submit-button";
import { useAuth } from "@/providers/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import InputField from "./input-field";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, "Email is required"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Integrate Zod for validation
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
      reset();
    } catch (error) {
      toast.error((error as Error).message || "An unexpected error occurred", {
        description: "Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email Input Field */}
      <InputField
        type="email"
        label="Email Address"
        {...register("email")}
        placeholder="you@example.com"
        id="email"
        error={!!errors?.email}
        errorMessage={errors.email?.message}
      />

      <InputField
        id="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        error={!!errors.password?.message}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-900  rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-gray-700 dark:text-white/70 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <Link
          href="/forgot-password"
          className="font-medium text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out"
        >
          Forgot your password?
        </Link>
      </div>

      {/* Sign In Button */}
      <div>
        <SubmitButton text="Sign In" afterSubmit="Signing in..." />
      </div>
    </form>
  );
};

export default LoginForm;
