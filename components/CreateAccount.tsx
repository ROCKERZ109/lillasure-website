"use client";

import React, { useEffect, useState } from 'react';
import { X, Mail, ArrowRight, Cookie } from 'lucide-react';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import AlertDialog from './AlertDialog';

type AuthView = 'create' | 'signup' | 'login' | 'forgot-password' | 'success';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [view, setView] = useState<AuthView>('create');
    const [isSignedUp, setSignedUp] = useState(false)

    const onClose = () => setIsOpen(false);

    const handleSignupClick = () => {
        if (email.trim()) {
            setView('signup');
        }
    };
    const onSuccess = () => {
        setSignedUp(true)
        setView('success')
        // setIsOpen(false);
    }
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && email.trim()) {
            handleSignupClick();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
                <div
                    className="
                        relative w-full sm:max-w-3xl 
                        bg-neutral-900 
                        rounded-3xl
                        shadow-2xl overflow-hidden 
                        flex flex-col sm:flex-row 
                        border border-neutral-800
                        max-h-[90vh]
                        transition-all duration-500 ease-out
                    "
                    style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(245, 158, 11, 0.1)'
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all duration-300 hover:rotate-90"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Left: Image Section (Desktop) */}
                    <div className="hidden sm:block relative w-full sm:w-2/5 h-48 sm:h-auto min-h-[500px]">
                        <img
                            src="/images/ghibli.png"
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Join Lilla Sur"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/40 via-neutral-900/40 to-transparent" />

                        {/* Cookie badge */}
                        <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-2 bg-neutral-900/90 backdrop-blur-sm rounded-full border border-amber-500/30">
                            <Cookie className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-medium text-amber-400">Free cookie inside!</span>
                        </div>
                    </div>

                    {/* Right: Content Section */}
                    <div className="flex-1 flex flex-col justify-center overflow-y-auto">

                        {/* View: Create Account (Initial) */}
                        {view === 'create' && (
                            <div className="p-5 sm:p-10">
                                {/* Mobile cookie badge */}
                                <div className="sm:hidden flex items-center gap-2 px-3 py-1.5 bg-neutral-800 rounded-full border border-amber-500/30 w-fit mb-4">
                                    <Cookie className="w-3.5 h-3.5 text-amber-500" />
                                    <span className="text-xs font-medium text-amber-400">Free cookie!</span>
                                </div>

                                {/* Heading */}
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight">
                                    Join the{' '}
                                    <span className="font-century text-amber-500 italic">Lilla Sur</span>
                                    {' '}family
                                </h2>

                                {/* Subtext */}
                                <p className="text-neutral-400 font-body text-sm mb-6 leading-relaxed">
                                    Become a member and enjoy exclusive perks — starting with a
                                    <span className="font-semibold text-amber-500"> free cookie </span>
                                    on your next pickup! 🍪
                                </p>

                                {/* Email Input */}
                                <div className="space-y-4">
                                    {/* Mobile: Stacked */}
                                    <div className="flex flex-col sm:hidden gap-3">
                                        <div
                                            className={`
                                                flex items-center gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                                                ${isHovered
                                                    ? 'border-amber-500/50 bg-neutral-800 shadow-lg shadow-amber-500/10'
                                                    : 'border-neutral-700 bg-neutral-800/50'
                                                }
                                            `}
                                        >
                                            <Mail className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-amber-500' : 'text-neutral-500'}`} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Enter your email address"
                                                className="flex-1 bg-transparent text-white placeholder:text-neutral-500 font-body text-sm focus:outline-none"
                                                onFocus={() => setIsHovered(true)}
                                                onBlur={() => setIsHovered(false)}
                                            />
                                        </div>
                                        <button
                                            onClick={handleSignupClick}
                                            disabled={!email.trim()}
                                            className={`
                                                flex items-center justify-center gap-2 w-full px-5 py-4
                                                font-body font-semibold text-sm 
                                                rounded-xl transition-all duration-300
                                                active:scale-[0.98]
                                                ${email.trim()
                                                    ? 'bg-amber-500 hover:bg-amber-400 text-neutral-900'
                                                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                                }
                                            `}
                                        >
                                            Continue
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Desktop: Inline */}
                                    <div
                                        className={`
                                            hidden sm:flex
                                            items-center gap-2 p-1.5 rounded-xl border-2 transition-all duration-300
                                            ${isHovered
                                                ? 'border-amber-500/50 bg-neutral-800 shadow-lg shadow-amber-500/10'
                                                : 'border-neutral-700 bg-neutral-800/50'
                                            }
                                        `}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <div className="flex items-center gap-2 flex-1 pl-3">
                                            <Mail className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-amber-500' : 'text-neutral-500'}`} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Enter your email address"
                                                className="flex-1 py-2.5 bg-transparent text-white placeholder:text-neutral-500 font-body text-sm focus:outline-none"
                                            />
                                        </div>
                                        <button
                                            onClick={handleSignupClick}
                                            disabled={!email.trim()}
                                            className={`
                                                flex items-center gap-2 px-5 py-2.5 
                                                font-body font-semibold text-sm 
                                                rounded-lg transition-all duration-300
                                                active:scale-95
                                                ${email.trim()
                                                    ? 'bg-amber-500 hover:bg-amber-400 text-neutral-900 hover:shadow-lg hover:shadow-amber-500/20 hover:gap-3'
                                                    : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                                                }
                                            `}
                                        >
                                            Continue
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative py-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-neutral-800"></div>
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="px-4 bg-neutral-900 text-neutral-600 text-sm font-body">or</span>
                                        </div>
                                    </div>

                                    {/* Already a member */}
                                    <button
                                        onClick={() => setView('login')}
                                        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-neutral-700 hover:border-neutral-600 bg-neutral-800/30 hover:bg-neutral-800/50 text-neutral-300 hover:text-white font-body font-medium transition-all duration-300"
                                    >
                                        I already have an account
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* View: Signup */}
                        {view === 'signup' && (
                            <div className="overflow-y-auto max-h-[80vh]">
                                <Signup
                                    email={email}
                                    onSuccess={onSuccess}
                                    onLoginClick={() => setView('login')}
                                />
                            </div>
                        )}

                        {/* View: Login */}
                        {view === 'login' && (
                            <div className="overflow-y-auto max-h-[80vh]">
                                <Login
                                    onSuccess={onClose}
                                    onSignupClick={() => setView('create')}
                                    onForgotPassword={() => setView('forgot-password')}
                                />
                            </div>
                        )}

                        {/* View: Forgot Password */}
                        {view === 'forgot-password' && (
                            <div className="overflow-y-auto max-h-[80vh]">
                                <ForgotPassword
                                    onBackToLogin={() => setView('login')}
                                />
                            </div>
                        )}
                        {/* Signed up*/}
                        {view === 'success' && isSignedUp && (
                            <div className="overflow-y-auto max-h-[80vh]">
                                <AlertDialog type={"success"} message='Thanks for signing up, you will recieve an email with your cookie details' />
                            </div>)
                        }

                    </div>
                </div>

            </div>
        </>
    );
};

export default CreateAccount;