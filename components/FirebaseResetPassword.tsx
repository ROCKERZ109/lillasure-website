// app/[locale]/auth/reset-password/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const oobCode = searchParams.get('oobCode');

    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const schema = z.object({
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
        formState: { errors, isValid }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    // Verify the reset code on mount
    useEffect(() => {
        const verifyCode = async () => {
            if (!oobCode) {
                setError("Invalid or missing reset link");
                setIsVerifying(false);
                return;
            }

            try {
                const email = await verifyPasswordResetCode(auth, oobCode);
                setEmail(email);
            } catch (err: any) {
                if (err.code === 'auth/expired-action-code') {
                    setError("This reset link has expired. Please request a new one.");
                } else if (err.code === 'auth/invalid-action-code') {
                    setError("This reset link is invalid or has already been used.");
                } else {
                    setError("Something went wrong. Please try again.");
                }
            } finally {
                setIsVerifying(false);
            }
        };

        verifyCode();
    }, [oobCode]);

    const onSubmit = async (data: FormData) => {
        if (!oobCode) return;

        setIsLoading(true);
        setError(null);

        try {
            await confirmPasswordReset(auth, oobCode, data.password);
            setIsSuccess(true);
        } catch (err: any) {
            if (err.code === 'auth/expired-action-code') {
                setError("This reset link has expired. Please request a new one.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password is too weak. Please choose a stronger password.");
            } else {
                setError("Failed to reset password. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass = (field: keyof FormData) => `
        w-full pl-12 pr-12 py-4
        bg-neutral-800/50 
        border-2 rounded-2xl
        font-body text-white text-sm
        placeholder:text-neutral-500
        transition-all duration-300
        focus:outline-none focus:ring-4
        ${errors[field]
            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10'
            : 'border-neutral-700 focus:border-amber-500 focus:ring-amber-500/10'
        }
    `;

    // Loading state - Verifying code
    if (isVerifying) {
        return (
            <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md text-center">
                    <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
                    <p className="text-neutral-400 font-body">Verifying reset link...</p>
                </div>
            </main>
        );
    }

    // Error state - Invalid/Expired link
    if (error && !email) {
        return (
            <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="font-display text-2xl font-bold text-white mb-3">Link Invalid</h1>
                    <p className="text-neutral-400 font-body text-sm mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-body font-semibold text-sm rounded-xl transition-all"
                    >
                        Back to Home
                    </button>
                </div>
            </main>
        );
    }

    // Success state
    if (isSuccess) {
        return (
            <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="font-display text-2xl font-bold text-white mb-3">Password Reset!</h1>
                    <p className="text-neutral-400 font-body text-sm mb-6">
                        Your password has been successfully updated. You can now sign in with your new password.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-body font-semibold text-sm rounded-xl transition-all active:scale-[0.98]"
                    >
                        Go to Home & Sign In
                    </button>
                </div>
            </main>
        );
    }

    // Reset form
    return (
        <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-6">
                        <KeyRound className="w-8 h-8 text-amber-500" />
                    </div>
                    <h1 className="font-display text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-neutral-500 font-body text-sm">
                        Enter a new password for
                    </p>
                    <p className="text-amber-500 font-body font-medium">{email}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Error */}
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* New Password */}
                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400 font-body ml-1">
                            New Password
                        </label>
                        <div className="relative">
                            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.password ? 'text-red-400' : 'text-neutral-500'}`} />
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={inputClass("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs ml-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="block text-sm text-neutral-400 font-body ml-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.confirmPassword ? 'text-red-400' : 'text-neutral-500'}`} />
                            <input
                                {...register("confirmPassword")}
                                type={showConfirm ? "text" : "password"}
                                placeholder="••••••••"
                                className={inputClass("confirmPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500 transition-colors"
                            >
                                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-400 text-xs ml-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!isValid || isLoading}
                        className={`
                            w-full flex items-center justify-center gap-3
                            px-6 py-4 rounded-2xl
                            font-body font-bold text-base
                            transition-all duration-300 active:scale-[0.98]
                            ${isValid && !isLoading
                                ? 'bg-amber-500 hover:bg-amber-400 text-neutral-900'
                                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            }
                        `}
                    >
                        {isLoading ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Resetting...</>
                        ) : (
                            <><span>Reset Password</span> <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default ResetPasswordPage;
