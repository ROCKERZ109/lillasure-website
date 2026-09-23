// ForgotPassword.tsx - COMPACT VERSION

"use client";

// import { resetPassword } from "@/lib/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { resetPassword } from "@/lib/auth";

interface ForgotPasswordProps {
    onBackToLogin?: () => void;
}

const ForgotPassword = ({ onBackToLogin }: ForgotPasswordProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const schema = z.object({
        email: z.string().email({ message: "Invalid email" }),
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
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setError(null);
        try {
            
            await resetPassword(data.email);
            setIsSuccess(true);
        } catch (err: any) {
            setError("Something went wrong. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Success State
    if (isSuccess) {
        return (
            <div className="w-full px-5 py-6 sm:px-8 sm:py-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                </div>
                <h2 className="font-display text-xl font-bold text-white mb-2">Check Your Email</h2>
                <p className="text-neutral-400 text-xs mb-1">We've sent a reset link to</p>
                <p className="text-amber-500 font-semibold text-sm mb-4">{getValues("email")}</p>

                <p className="text-neutral-500 text-xs mb-4">
                    Didn't receive it?{' '}
                    <button onClick={() => setIsSuccess(false)} className="text-amber-500 hover:underline">
                        Try again
                    </button>
                </p>

                <button
                    onClick={onBackToLogin}
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to login
                </button>
            </div>
        );
    }

    return (
        <div className="w-full px-5 py-6 sm:px-8 sm:py-8">
            {/* Header */}
            <div className="text-center mb-5">
                <h2 className="font-display text-2xl font-bold text-white">Forgot Password?</h2>
                <p className="text-neutral-500 font-body text-xs mt-1 ">
                    No worries, we'll send you a reset link
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        className={`
                            w-full pl-10 pr-4 py-3
                            bg-neutral-800/50 
                            border rounded-xl
                            font-body text-white text-sm
                            placeholder:text-neutral-500
                            transition-all duration-200
                            focus:outline-none focus:ring-2
                            ${errors.email
                                ? 'border-red-500/50 focus:ring-red-500/20'
                                : 'border-neutral-700 focus:border-amber-500 focus:ring-amber-500/20'
                            }
                        `}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>}
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
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                        <><span>Send Reset Link</span> <ArrowRight className="w-4 h-4" /></>
                    )}
                </button>

                {/* Back to Login */}
                <button
                    type="button"
                    onClick={onBackToLogin}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 hover:border-neutral-600 text-neutral-400 hover:text-white text-sm transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
