// app/[locale]/auth/reset-password/page.tsx

import { Suspense } from 'react';
import ResetPasswordPage from '@/components/FirebaseResetPassword';
import { Loader2, Cookie } from 'lucide-react';

// ✅ Sexy Loading Component
const ResetPasswordLoading = () => {
    return (
        <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            <div className="text-center">
                {/* Animated Logo/Icon */}
                <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto animate-pulse">
                        <Cookie className="w-10 h-10 text-amber-500" />
                    </div>
                    {/* Spinning ring */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto">
                        <div className="w-full h-full rounded-full border-2 border-transparent border-t-amber-500 animate-spin" />
                    </div>
                </div>

                <Loader2 className="w-6 h-6 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="text-neutral-400 font-body text-sm">Loading...</p>
            </div>
        </main>
    );
};

// ✅ Main Page Component
const ResetPassword = () => {
    return (
        <Suspense fallback={<ResetPasswordLoading />}>
            <ResetPasswordPage />
        </Suspense>
    );
};

export default ResetPassword;