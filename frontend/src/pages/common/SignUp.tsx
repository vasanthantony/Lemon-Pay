import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth/signup";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";


const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const { login: setAuthUser } = useAuth(); // use different name to avoid conflict
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signup(data);
      console.log("Signup successful");
      setAuthUser(response); // set user in context
      navigate("/taskmanager"); // or wherever you want to go
      toast.success('Signup successfully!');
    } catch (error:any) {
      console.error("Signup failed", error);
      toast.error(error.response.data.message);
      // optionally show an error toast or message here
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome Sign Up System</h1>
        <p className="text-sm">Your gateway to seamless transactions and easy payments.</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="w-full p-3 rounded-md bg-white/30 text-white placeholder-white/70 border-none focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="mahadev@lemonpay.tech"
        />
        {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="Min 8 characters"
          className="w-full p-3 rounded-md bg-white/30 text-white placeholder-white/70 border-none focus:outline-none focus:ring-2 focus:ring-white"
        />
        {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          placeholder="Min 8 characters"
          className="w-full p-3 rounded-md bg-white/30 text-white placeholder-white/70 border-none focus:outline-none focus:ring-2 focus:ring-white"
        />
        {errors.confirmPassword && (
          <p className="text-red-300 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="mr-2 cursor-pointer"
          />
          Remember me
        </label>
        <button type="button" className="text-white cursor-pointer" onClick={() => navigate("/login")}>
          Sign In
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-white text-[#5036D5] font-semibold rounded-xl hover:bg-opacity-90 transition cursor-pointer"
      >
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
