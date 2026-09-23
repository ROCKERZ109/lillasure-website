// Signup.tsx - COMPACT VERSION

"use client";

import { signUp } from "@/lib/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { Mail, User, Phone, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { userContext } from "./UserContext";
import { usePathname, useRouter } from "next/navigation";

interface SignupProps {
    email?: string;
    onSuccess?: () => void;
    onLoginClick?: () => void;
}

const Signup = ({ email = "", onSuccess, onLoginClick }: SignupProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = userContext();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailExists, setEmailExists] = useState(false);  // ✅ Track if email exists
    const router = useRouter();
    const pathname = usePathname();

    const schema = z.object({
        name: z.string().min(2, { message: "Min 2 characters" }),
        email: z.string().email({ message: "Invalid email" }),
        phone: z.string().min(9, { message: "Min 9 digits" }),
        password: z.string().min(6, { message: "Min 6 characters" }),
        confirmPassword: z.string().min(6, { message: "Confirm password" }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: { email }
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setError(null);
        setEmailExists(false);

        try {
            await signUp(data.email, data.name, data.phone, data.password, true);
            onSuccess?.();
            router.replace(pathname);
        } catch (err: any) {
            console.error("Signup error:", err);

            // ✅ Check for email already in use
            if (err.code === 'auth/email-already-in-use') {
                setEmailExists(true);
                setError("This email is already registered");
            } else if (err.code === 'auth/weak-password') {
                setError("Password is too weak. Please choose a stronger one.");
            } else if (err.code === 'auth/invalid-email') {
                setError("Invalid email address");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Handle redirect to login with pre-filled email
    const handleGoToLogin = () => {
        onLoginClick?.();
    };

    const inputClass = (field: keyof FormData) => `
        w-full pl-10 pr-10 py-3
        bg-neutral-800/50 
        border rounded-xl
        font-body text-white text-sm
        placeholder:text-neutral-500
        transition-all duration-200
        focus:outline-none focus:ring-2
        ${errors[field]
            ? 'border-red-500/50 focus:ring-red-500/20'
            : 'border-neutral-700 focus:border-amber-500 focus:ring-amber-500/20'
        }
    `;

    return (
        <div className="w-full px-5 py-4 sm:px-8 sm:py-6">
            {/* Header - Compact */}
            <div className="text-center mb-4">
                <h2 className="font-display text-2xl font-bold text-white">Create Account</h2>
                <p className="text-neutral-500 font-body text-xs mt-1">
                    Join <span className="text-amber-500 font-body">Lilla Sur</span> family
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

                {/* ✅ Email Already Exists - Special UI */}
                {emailExists && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-amber-200 text-sm font-medium mb-1">
                                    Email already registered
                                </p>
                                <p className="text-amber-200/70 text-xs mb-3">
                                    An account with <strong>{getValues("email")}</strong> already exists.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleGoToLogin}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-semibold text-xs rounded-lg transition-all"
                                >
                                    Sign in instead
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ Generic Error (not email exists) */}
                {error && !emailExists && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <p className="text-red-400 text-xs text-center">{error}</p>
                    </div>
                )}

                {/* Name */}
                <div className="relative">
                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.name ? 'text-red-400' : 'text-neutral-500'}`} />
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Full name"
                        className={inputClass("name")}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.email || emailExists ? 'text-red-400' : 'text-neutral-500'}`} />
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email address"
                        className={`${inputClass("email")} ${emailExists ? 'border-amber-500/50' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.phone ? 'text-red-400' : 'text-neutral-500'}`} />
                    <input
                        {...register("phone")}
                        type="tel"
                        placeholder="Phone number"
                        maxLength={12}
                        className={inputClass("phone")}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone.message}</p>}
                </div>

                {/* Password Row - Side by Side on Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Password */}
                    <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.password ? 'text-red-400' : 'text-neutral-500'}`} />
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className={inputClass("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.confirmPassword ? 'text-red-400' : 'text-neutral-500'}`} />
                        <input
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className={inputClass("confirmPassword")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500"
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className={`
                        w-full flex items-center justify-center gap-2
                        px-4 py-3 rounded-xl
                        font-body font-semibold text-sm
                        transition-all duration-300 active:scale-[0.98]
                        ${isValid && !isLoading
                            ? 'bg-amber-500 hover:bg-amber-400 text-neutral-900'
                            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        }
                    `}
                >
                    {isLoading ? (
                        <><Loader2 className="w-4 h-4 animate-spin font-body" /> Creating...</>
                    ) : (
                        <><span>Create Account</span> <ArrowRight className="w-4 h-4" /></>
                    )}
                </button>

                {/* Login Link */}
                <p className="text-center text-neutral-500 text-xs font-body">
                    Already have an account?{' '}
                    <button type="button" onClick={onLoginClick} className="text-amber-500 font-semibold hover:underline font-body">
                        Sign in
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Signup;
