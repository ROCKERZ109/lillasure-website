import ProtectedRoute from '@/components/ProtectedRoute';
import OrderHistory from '@/components/OrderHistory';

export default function OrdersPage() {
    return (
        <ProtectedRoute>
            <OrderHistory />
        </ProtectedRoute>
    );
}