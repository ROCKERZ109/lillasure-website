"use client";

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePassword } from '@/lib/auth';

const ChangePassword = () => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const schema = z.object({
        currentPassword: z.string().min(6, { message: "Min 6 characters" }),
        newPassword: z.string().min(6, { message: "Min 6 characters" }),
        confirmPassword: z.string().min(6, { message: "Confirm password" }),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    }).refine((data) => data.currentPassword !== data.newPassword, {
        message: "New password must be different",
        path: ["newPassword"],
    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setError(null);
        try {
            await changePassword(data.currentPassword, data.newPassword);
            setIsSuccess(true);
            reset();
        } catch (err: any) {
            if (err.code === 'auth/wrong-password') {
                setError('Current password is incorrect');
            } else if (err.code === 'auth/requires-recent-login') {
                setError('Please log out and log in again, then try');
            } else {
                setError(err.message || 'Something went wrong');
            }
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

    // Success State
    if (isSuccess) {
        return (
            <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Password Changed!</h3>
                <p className="text-neutral-400 text-sm mb-4">Your password has been updated successfully.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-amber-500 hover:underline text-sm"
                >
                    Change again
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Error */}
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 text-xs text-center">{error}</p>
                </div>
            )}

            {/* Current Password */}
            <div className="space-y-2">
                <label className="text-sm text-neutral-400 font-body ml-1">Current Password</label>
                <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.currentPassword ? 'text-red-400' : 'text-neutral-500'}`} />
                    <input
                        {...register("currentPassword")}
                        type={showCurrent ? "text" : "password"}
                        placeholder="••••••••"
                        className={inputClass("currentPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500"
                    >
                        {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.currentPassword && <p className="text-red-400 text-xs ml-1">{errors.currentPassword.message}</p>}
            </div>

            {/* New Password */}
            <div className="space-y-2">
                <label className="text-sm text-neutral-400 font-body ml-1">New Password</label>
                <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.newPassword ? 'text-red-400' : 'text-neutral-500'}`} />
                    <input
                        {...register("newPassword")}
                        type={showNew ? "text" : "password"}
                        placeholder="••••••••"
                        className={inputClass("newPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500"
                    >
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.newPassword && <p className="text-red-400 text-xs ml-1">{errors.newPassword.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <label className="text-sm text-neutral-400 font-body ml-1">Confirm New Password</label>
                <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.confirmPassword ? 'text-red-400' : 'text-neutral-500'}`} />
                    <input
                        {...register("confirmPassword")}
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        className={inputClass("confirmPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500"
                    >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs ml-1">{errors.confirmPassword.message}</p>}
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
                    <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
                ) : (
                    <><span>Update Password</span> <ArrowRight className="w-4 h-4" /></>
                )}
            </button>
        </form>
    );
};

export default ChangePassword;