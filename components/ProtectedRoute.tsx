// components/ProtectedRoute.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userContext } from '@/components/UserContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = userContext();
    const router = useRouter();

    useEffect(() => {
        // Wait for loading to finish
        if (!loading && !user.email) {
            // Not logged in → redirect to home
            router.push('/');
        }
    }, [user, loading, router]);

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
        );
    }

    // Not logged in → show nothing (redirecting)
    if (!user.email) {
        return null;
    }

    // Logged in → show content
    return <>{children}</>;
};

export default ProtectedRoute;