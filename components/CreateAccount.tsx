"use client";

import React, { useEffect, useState } from 'react';
import { X, Mail, ArrowRight, Cookie, Sparkles } from 'lucide-react';

interface CreateAccountProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const CreateAccount = ({ isOpen = true, onClose }: CreateAccountProps) => {
    const [email, setEmail] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    // ✅ ADD THIS - Background scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop - onClick REMOVED ❌ */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            // onClick={onClose}  ← YE HATAYA
            />

            {/* Modal - items-center on all screens ✅ */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/*                        ^^^^^^^^^^^^^^
                                   CHANGE: items-end sm:items-center 
                                   →       items-center (both mobile + desktop)
        */}
                <div
                    className="
            relative w-full sm:max-w-3xl 
            bg-neutral-900 
            rounded-3xl
            shadow-2xl overflow-hidden 
            flex flex-col sm:flex-row 
            border border-neutral-800
            max-h-[90vh]
          "
                    /*  CHANGES:
                        - rounded-t-3xl sm:rounded-3xl → rounded-3xl (all corners)
                        - border-t sm:border → border (all sides)
                    */
                    style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(245, 158, 11, 0.1)'
                    }}
                >
                    {/* Drag Handle - REMOVED (not needed when centered) */}

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all duration-300 hover:rotate-90"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Image Section - Hidden on small mobile, visible on larger */}
                    <div className="hidden sm:block relative w-full sm:w-2/5 h-48 sm:h-auto min-h-[280px]">
                        <img
                            src="/images/ghibli.png"
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Join Lilla Sur"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-neutral-900/90 via-neutral-900/40 to-transparent" />

                        {/* Floating badge - Desktop */}
                        <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-2 bg-neutral-900/90 backdrop-blur-sm rounded-full border border-amber-500/30">
                            <Cookie className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-medium text-amber-400">Free cookie inside!</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-5 sm:p-10 flex flex-col justify-center overflow-y-auto">
                        {/* Mobile: Cookie badge */}
                        <div className="flex items-center justify-between mb-4 sm:mb-4">
                            {/* Mobile cookie badge */}
                            <div className="sm:hidden flex items-center gap-2 px-3 py-1.5 bg-neutral-800 rounded-full border border-amber-500/30">
                                <Cookie className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-xs font-medium text-amber-400">Free cookie!</span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight">
                            Join the{' '}
                            <span className="font-century text-amber-500 italic">Lilla Sur</span>
                            {' '}family
                        </h2>

                        {/* Subtext */}
                        <p className="text-neutral-400 font-body text-sm mb-5 sm:mb-6 leading-relaxed">
                            Become a member and enjoy exclusive perks — starting with a
                            <span className="font-semibold text-amber-500"> free cookie </span>
                            on your next pickup! 🍪
                        </p>

                        {/* Email Input Group */}
                        <div className="space-y-3">
                            {/* Mobile: Stacked layout */}
                            <div className="flex flex-col sm:hidden gap-3">
                                <div
                                    className={`
                    flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300
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
                                        placeholder="Enter your email address"
                                        className="flex-1 bg-transparent text-white placeholder:text-neutral-500 font-body text-sm focus:outline-none"
                                        onFocus={() => setIsHovered(true)}
                                        onBlur={() => setIsHovered(false)}
                                    />
                                </div>
                                <button
                                    className="
                    flex items-center justify-center gap-2 w-full px-5 py-3.5
                    bg-amber-500 hover:bg-amber-400 
                    text-neutral-900 font-body font-semibold text-sm 
                    rounded-xl transition-all duration-300
                    active:scale-[0.98]
                  "
                                >
                                    Sign Up
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Desktop: Inline layout */}
                            <div
                                className={`
                  hidden sm:flex
                  relative items-center gap-2 p-1.5 rounded-xl border-2 transition-all duration-300
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
                                        placeholder="Enter your email address"
                                        className="flex-1 py-2.5 bg-transparent text-white placeholder:text-neutral-500 font-body text-sm focus:outline-none"
                                    />
                                </div>
                                <button
                                    className="
                    flex items-center gap-2 px-5 py-2.5 
                    bg-amber-500 hover:bg-amber-400 
                    text-neutral-900 font-body font-semibold text-sm 
                    rounded-lg transition-all duration-300
                    hover:shadow-lg hover:shadow-amber-500/20
                    hover:gap-3
                    active:scale-95
                  "
                                >
                                    Sign Up
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Terms */}
                            <p className="text-xs text-neutral-500 text-center sm:text-left">
                                By signing up, you agree to our{' '}
                                <a href="#" className="text-amber-500 hover:text-amber-400 hover:underline">Terms</a>
                                {' '}and{' '}
                                <a href="#" className="text-amber-500 hover:text-amber-400 hover:underline">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateAccount;