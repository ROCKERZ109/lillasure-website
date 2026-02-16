"use client";

import React, { useState, useRef, useEffect } from 'react';
import { User2Icon, LogOut, UserCircle, ChevronDown, Package, Heart, LogIn, UserPlus, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import { userContext } from './UserContext';
import { usePathname, useRouter } from 'next/navigation';

interface UserDropdownProps {
    isLoggedIn?: boolean;
    userName?: string;
    onLogout?: () => void;
}

type AuthView = 'login' | 'signup' | 'forgot-password';

export const UserDropdown = ({
    isLoggedIn = false,
    userName = "Guest",
    onLogout,
}: UserDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authView, setAuthView] = useState<AuthView>('login');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { clearUser } = userContext();
    const router = useRouter();
    const pathname = usePathname();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleLogOut = async () => {
        setIsOpen(false);
        clearUser();
        onLogout?.();
        router.push("/")
    }
    // Lock body scroll when modal open
    useEffect(() => {
        if (showAuthModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showAuthModal]);

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const handleLoginClick = () => {
        setIsOpen(false);
        setAuthView('login');
        setShowAuthModal(true);
    };

    const handleSignupClick = () => {
        setIsOpen(false);
        setAuthView('signup');
        setShowAuthModal(true);
    };

    const handleAuthSuccess = () => {
        setShowAuthModal(false);
    };

    return (
        <>
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
                {/* Trigger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 rounded-lg
                        transition-all duration-300
                        ${isOpen
                            ? 'bg-neutral-800 text-white'
                            : 'hover:bg-neutral-800/50 text-amber-100 hover:text-white'
                        }
                    `}
                >
                    {isLoggedIn ? (
                        <>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                <span className="text-[10px] sm:text-xs font-bold text-neutral-900">{getInitials(userName)}</span>
                            </div>
                            <span className="hidden sm:block font-body text-sm font-medium">{userName}</span>
                        </>
                    ) : (
                        <>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                                <User2Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
                            </div>
                            <span className="hidden sm:block font-body text-sm text-neutral-400">Account</span>
                        </>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div className={`
                    fixed sm:absolute 
                    left-1/2 sm:left-auto sm:right-0 
                    -translate-x-1/2 sm:translate-x-0
                    top-16 sm:top-full sm:mt-2 
                    w-[90vw] sm:w-56
                    bg-neutral-900 border border-neutral-800 
                    rounded-2xl shadow-xl shadow-black/30
                    overflow-hidden z-50
                    transition-all duration-300 origin-top
                    ${isOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }
                `}>
                    {isLoggedIn ? (
                        <>
                            {/* User Info Header */}
                            <div className="px-4 py-3 border-b border-neutral-800 bg-neutral-800/30">
                                <p className="font-body font-semibold text-white text-sm">{userName}</p>
                                <p className="font-body text-xs text-amber-500">Lilla Sur Member ✨</p>
                            </div>

                            {/* Menu Items */}
                            <div className="py-1.5">
                                <Link
                                    href="/konto"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-800/50 transition-colors group"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-neutral-800 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                                        <UserCircle className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm text-white">My Account</p>
                                        <p className="font-body text-[10px] text-neutral-500">Profile & settings</p>
                                    </div>
                                </Link>

                                <Link
                                    href="/konto/orders"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-800/50 transition-colors group"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-neutral-800 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                                        <Package className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm text-white">My Orders</p>
                                        <p className="font-body text-[10px] text-neutral-500">Track & history</p>
                                    </div>
                                </Link>

                                {/* <Link
                                    href="/konto/favorites"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-800/50 transition-colors group"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-neutral-800 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                                        <Heart className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm text-white">Favorites</p>
                                        <p className="font-body text-[10px] text-neutral-500">Saved items</p>
                                    </div>
                                </Link> */}
                            </div>

                            {/* Logout */}
                            <div className="border-t border-neutral-800 py-1.5">
                                <button
                                    onClick={handleLogOut}
                                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/10 transition-colors group"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-neutral-800 group-hover:bg-red-500/20 flex items-center justify-center transition-colors">
                                        <LogOut className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-500 transition-colors" />
                                    </div>
                                    <p className="font-body text-sm text-neutral-400 group-hover:text-red-400 transition-colors">Log out</p>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-neutral-800 bg-neutral-800/30 text-center">
                                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-2">
                                    <User2Icon className="w-5 h-5 text-neutral-500" />
                                </div>
                                <p className="font-body font-semibold text-white text-sm">Welcome!</p>
                                <p className="font-body text-[10px] text-neutral-500">Sign in for the best experience</p>
                            </div>

                            {/* Auth Buttons */}
                            <div className="p-3 space-y-2">
                                <button
                                    onClick={handleLoginClick}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-body font-semibold text-xs rounded-lg transition-all active:scale-[0.98]"
                                >
                                    <LogIn className="w-3.5 h-3.5" />
                                    Sign In
                                </button>

                                <button
                                    onClick={handleSignupClick}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/50 text-white font-body font-medium text-xs rounded-lg transition-all"
                                >
                                    <UserPlus className="w-3.5 h-3.5" />
                                    Create Account
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Auth Modal */}
            {showAuthModal && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                        onClick={() => setShowAuthModal(false)}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                        <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowAuthModal(false)}
                                className="absolute top-3 right-3 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all z-10 hover:rotate-90"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Auth Views */}
                            {authView === 'login' && (
                                <Login
                                    onSuccess={handleAuthSuccess}
                                    onSignupClick={() => setAuthView('signup')}
                                    onForgotPassword={() => setAuthView('forgot-password')}
                                />
                            )}

                            {authView === 'signup' && (
                                <Signup
                                    onSuccess={handleAuthSuccess}
                                    onLoginClick={() => setAuthView('login')}
                                />
                            )}

                            {authView === 'forgot-password' && (
                                <ForgotPassword
                                    onBackToLogin={() => setAuthView('login')}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default UserDropdown;
