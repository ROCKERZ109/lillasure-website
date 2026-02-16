"use client";

import React, { useState } from 'react';
import {
    User, Mail, Phone, Save, Package, ChevronRight,
    LogOut, Settings, Loader2, KeyRound
} from 'lucide-react';
import { userContext } from '@/components/UserContext';
import { UserData } from '@/types';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { updateUserProfile } from '@/lib/user';

const Account = () => {
    const { user, clearUser, setUser } = userContext();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        email: user.email,
        name: user.name,
        phone: user.phone,
        uid: user.uid
    });

    const handleLogout = async () => {
        await clearUser();
        router.push('/');
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateUserProfile(user.uid, {
                name: userData.name,
                phone: userData.phone
            });
            // Update context bhi
            setUser({ ...user, name: userData.name, phone: userData.phone, uid:userData.uid });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsSaving(false);
        }
    };
    const inputClass = `
        w-full px-4 py-3
        bg-neutral-800/50
        border border-neutral-700 rounded-xl
        font-body text-white text-sm
        placeholder:text-neutral-500
        transition-all duration-200
        focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    return (
        <main className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 mb-4">
                        <User className="w-10 h-10 text-amber-500" />
                    </div>
                    <h1 className="font-display text-3xl font-bold text-white">My Account</h1>
                    <p className="text-neutral-500 font-body text-sm mt-1">
                        Manage your <span className="text-amber-500 font-century italic">Lilla Sur</span> profile
                    </p>
                </div>

                {/* Profile Card */}
                <section className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-neutral-500" />
                            <h2 className="font-display text-lg text-white">Profile Details</h2>
                        </div>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-amber-500 hover:text-amber-400 text-sm font-body font-medium transition-colors"
                            >
                                Edit
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-neutral-500 hover:text-white text-sm font-body transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    <div className="p-5 space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs text-neutral-500 font-body ml-1">
                                <Mail className="w-3.5 h-3.5" />
                                Email (cannot be changed)
                            </label>
                            <input
                                type="email"
                                value={user.email}
                                disabled={true}
                                className={`${inputClass} bg-neutral-800/30`}
                            />
                        </div>

                        {/* Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs text-neutral-500 font-body ml-1">
                                <User className="w-3.5 h-3.5" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={isEditing ? userData.name : user.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                disabled={!isEditing}
                                className={inputClass}
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs text-neutral-500 font-body ml-1">
                                <Phone className="w-3.5 h-3.5" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={isEditing ? userData.phone : user.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                disabled={!isEditing}
                                className={inputClass}
                            />
                        </div>

                        {/* Save Button */}
                        {isEditing && (
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-body font-semibold text-sm rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {isSaving ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                                ) : (
                                    <><Save className="w-4 h-4" /> Save Changes</>
                                )}
                            </button>
                        )}
                    </div>
                </section>

                {/* Quick Links */}
                <section className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                    <div className="divide-y divide-neutral-800">
                        {/* Order History */}
                        <Link
                            href="/konto/orders"
                            className="w-full px-5 py-4 flex items-center gap-4 hover:bg-neutral-800/30 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                                <Package className="w-5 h-5 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-body font-medium text-white text-sm">Order History</p>
                                <p className="text-neutral-500 text-xs font-body">View and manage your orders</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-amber-500 transition-colors" />
                        </Link>

                        {/* Change Password */}
                        <Link
                            href="/konto/change-password"
                            className="w-full px-5 py-4 flex items-center gap-4 hover:bg-neutral-800/30 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                                <KeyRound className="w-5 h-5 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-body font-medium text-white text-sm">Change Password</p>
                                <p className="text-neutral-500 text-xs font-body">Update your password</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-amber-500 transition-colors" />
                        </Link>

                        {/* Logout */}
                        <button
                            className="w-full px-5 py-4 flex items-center gap-4 hover:bg-red-500/10 transition-colors group"
                            onClick={handleLogout}
                        >
                            <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-red-500/20 flex items-center justify-center transition-colors">
                                <LogOut className="w-5 h-5 text-neutral-400 group-hover:text-red-500 transition-colors" />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-body font-medium text-white group-hover:text-red-400 text-sm transition-colors">
                                    Log Out
                                </p>
                                <p className="text-neutral-500 text-xs font-body">Sign out of your account</p>
                            </div>
                        </button>
                    </div>
                </section>

            </div>
        </main>
    );
};

export default Account;
