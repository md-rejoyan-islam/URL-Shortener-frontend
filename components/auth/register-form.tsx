"use client";
import SubmitButton from "@/components/auth/submit-button";
import { useAuth } from "@/providers/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import InputField from "./input-field";

const registerSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Invalid email address" })
      .min(1, "Email is required"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .min(1, "Password is required"),
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name is required"),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
        invalid_type_error: "Confirm Password must be a string",
      })
      .min(1, "Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define the type for the form data based on the Zod schema
type registerFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<registerFormData>({
    resolver: zodResolver(registerSchema), // Integrate Zod for validation
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const { register: authRegister } = useAuth();
  const router = useRouter();
  const onSubmit = async (data: registerFormData) => {
    try {
      await authRegister(data.name, data.email, data.password);
      toast.success("Account created successfully", {
        description: "You can now log in with your new account.",
      });
      router.push("/login");
      reset();
    } catch (error) {
      toast.error((error as Error).message || "An unexpected error occurred", {
        description: "Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name Input Field */}
      <InputField
        id="name"
        type="text"
        label="Username"
        {...register("name")}
        placeholder="John Doe"
        error={!!errors?.name}
        errorMessage={errors.name?.message}
      />

      {/* Email Input Field */}
      <InputField
        id="email"
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        error={!!errors?.email}
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <InputField
        id="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        error={!!errors.password}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <InputField
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="••••••••"
        error={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {/* Sign In Button */}
      <div>
        <SubmitButton text="Create account" afterSubmit="Creating account..." />
      </div>
    </form>
  );
};

export default RegisterForm;
