import ChangePassword from '@/components/ChangePassword';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function ChangePasswordPage() {
    return (
        <main className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/konto"
                        className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-white">Change Password</h1>
                        <p className="text-neutral-500 font-body text-sm">Update your account password</p>
                    </div>
                </div>

                {/* Change Password Form */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                    <ChangePassword />
                </div>
            </div>
        </main>
    );
}