// Login.tsx - COMPACT VERSION

"use client";


import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";

interface LoginProps {
    onSuccess?: () => void;
    onSignupClick?: () => void;
    onForgotPassword?: () => void;
}

const Login = ({ onSuccess, onSignupClick, onForgotPassword }: LoginProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const schema = z.object({
        email: z.string().email({ message: "Invalid email" }),
        password: z.string().min(6, { message: "Min 6 characters" }),
    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setError(null);
        try {
            await signIn(data.email, data.password, rememberMe);
            onSuccess?.();
            router.replace(pathname)
        } catch (err: any) {
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
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
            {/* Header */}
            <div className="text-center mb-5">
                <h2 className="font-display text-2xl font-bold text-white">Welcome Back</h2>
                <p className="text-neutral-500 font-body text-xs mt-1">
                    Sign in to <span className="text-amber-500">Lilla Sur</span>
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Error */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <p className="text-red-400 text-xs text-center">{error}</p>
                    </div>
                )}

                {/* Email */}
                <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.email ? 'text-red-400' : 'text-neutral-500'}`} />
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email address"
                        className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>}
                </div>

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
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-amber-500"
                    />
                    <label htmlFor="rememberMe" className="text-sm text-neutral-400 font-body">
                        Remember me for 30 days
                    </label>
                </div>
                {/* Forgot Password */}
                <div className="text-right">
                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-xs text-amber-500 hover:underline font-body"
                    >
                        Forgot password?
                    </button>
                </div>

                {/* Submit */}
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
                        <><Loader2 className="w-4 h-4 animate-spin"  /> Signing in...</>
                    ) : (
                        <><span>Sign In</span> <ArrowRight className="w-4 h-4 font-body" /></>
                    )}
                </button>

                {/* Divider */}
                {/* <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-3 bg-neutral-900 text-neutral-600 text-xs">or</span>
                    </div>
                </div> */}

                {/* Social */}
                {/* <div className="flex gap-3">
                    <button type="button" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition-all">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="text-white text-xs">Google</span>
                    </button>
                    <button type="button" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition-all">
                        <svg className="w-4 h-4" fill="#fff" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <span className="text-white text-xs">Apple</span>
                    </button>
                </div> */}

                {/* Signup Link */}
                <p className="text-center text-neutral-500 text-xs pt-1 font-body">
                    Don't have an account?{' '}
                    <button type="button" onClick={onSignupClick} className="text-amber-500 font-semibold hover:underline font-body">
                        Create one
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;