"use client";

import React, { useEffect, useState } from 'react';
import {
    Package, Calendar, Loader2, Clock,
    CheckCircle2, XCircle, ChevronDown, ChevronUp, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { userContext } from '@/components/UserContext';
import { Order } from '@/types';
import { getOrdersByEmail, cancelOrder } from '@/lib/orders';
import { formatPrice, formatDate } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

const OrderHistory = () => {
    const { user } = userContext();

    // Orders state
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [ordersError, setOrdersError] = useState<string | null>(null);

    // Cancel modal state
    const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    // Expanded order state
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    // Filter state
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Fetch orders on mount
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user.email) {
                setIsLoadingOrders(false);
                return;
            }

            try {
                setIsLoadingOrders(true);
                const fetchedOrders = await getOrdersByEmail(user.email);
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setOrdersError('Failed to load orders');
            } finally {
                setIsLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [user.email]);

    // Handle cancel order
    const handleCancelOrder = async () => {
        if (!cancellingOrderId) return;

        setIsCancelling(true);
        try {
            await cancelOrder(cancellingOrderId);

            setOrders(orders.map(order =>
                order.id === cancellingOrderId
                    ? { ...order, status: 'cancelled' }
                    : order
            ));

            setShowCancelModal(false);
            setCancellingOrderId(null);
        } catch (error) {
            console.error('Error cancelling order:', error);
        } finally {
            setIsCancelling(false);
        }
    };

    const openCancelModal = (orderId: string) => {
        setCancellingOrderId(orderId);
        setShowCancelModal(true);
    };

    const canCancelOrder = (status: string) => {
        return status === 'pending' || status === 'confirmed';
    };

    const statusConfig = {
        pending: {
            color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
            icon: Clock,
            label: 'Pending'
        },
        confirmed: {
            color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            icon: CheckCircle2,
            label: 'Confirmed'
        },
        completed: {
            color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            icon: CheckCircle2,
            label: 'Completed'
        },
        cancelled: {
            color: 'bg-red-500/20 text-red-400 border-red-500/30',
            icon: XCircle,
            label: 'Cancelled'
        }
    };

    // Filter orders
    const filteredOrders = statusFilter === 'all'
        ? orders
        : orders.filter(order => order.status === statusFilter);

    // Count by status
    const statusCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        completed: orders.filter(o => o.status === 'completed').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
    };

    return (
        <>
            <main className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4">
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href="/konto"
                            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="font-display text-2xl font-bold text-white">Order History</h1>
                            <p className="text-neutral-500 font-body text-sm">
                                {orders.length} total order{orders.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>

                    {/* Status Filter */}
                    {!isLoadingOrders && orders.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {[
                                { key: 'all', label: 'All', count: statusCounts.all },
                                { key: 'pending', label: 'Pending', count: statusCounts.pending },
                                { key: 'confirmed', label: 'Confirmed', count: statusCounts.confirmed },
                                { key: 'completed', label: 'Completed', count: statusCounts.completed },
                                { key: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled },
                            ].map((filter) => (
                                <button
                                    key={filter.key}
                                    onClick={() => setStatusFilter(filter.key)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm whitespace-nowrap transition-all
                                        ${statusFilter === filter.key
                                            ? 'bg-amber-500 text-neutral-900 font-semibold'
                                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                                        }
                                    `}
                                >
                                    {filter.label}
                                    {filter.count > 0 && (
                                        <span className={`
                                            px-1.5 py-0.5 rounded-full text-xs
                                            ${statusFilter === filter.key
                                                ? 'bg-neutral-900/20 text-neutral-900'
                                                : 'bg-neutral-700 text-neutral-400'
                                            }
                                        `}>
                                            {filter.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Orders List */}
                    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                        <div className="divide-y divide-neutral-800">
                            {/* Loading */}
                            {isLoadingOrders && (
                                <div className="p-12 text-center">
                                    <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
                                    <p className="text-neutral-500 font-body">Loading your orders...</p>
                                </div>
                            )}

                            {/* Error */}
                            {ordersError && (
                                <div className="p-12 text-center">
                                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                    <p className="text-red-400 font-body mb-4">{ordersError}</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-body text-sm transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {/* Empty */}
                            {!isLoadingOrders && !ordersError && orders.length === 0 && (
                                <div className="p-12 text-center">
                                    <Package className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                                    <h3 className="font-display text-lg text-white mb-2">No orders yet</h3>
                                    <p className="text-neutral-500 font-body text-sm mb-6">
                                        Your order history will appear here
                                    </p>
                                    <Link
                                        href="/produkter"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-900 rounded-xl font-body font-semibold text-sm transition-all"
                                    >
                                        Browse Products
                                    </Link>
                                </div>
                            )}

                            {/* Filtered Empty */}
                            {!isLoadingOrders && !ordersError && orders.length > 0 && filteredOrders.length === 0 && (
                                <div className="p-12 text-center">
                                    <Package className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                                    <p className="text-neutral-500 font-body">
                                        No {statusFilter} orders
                                    </p>
                                </div>
                            )}

                            {/* Orders */}
                            {!isLoadingOrders && !ordersError && filteredOrders.map((order) => {
                                const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
                                const isExpanded = expandedOrderId === order.id;

                                return (
                                    <div key={order.id} className="bg-neutral-900">
                                        {/* Order Header */}
                                        <div
                                            className="px-5 py-4 flex items-center gap-4 hover:bg-neutral-800/30 transition-colors cursor-pointer"
                                          // @ts-ignore  
                                            onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0">
                                                <Package className="w-6 h-6 text-amber-500" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <span className="font-body font-semibold text-white">
                                                        
                                                        #{
                                                         // @ts-ignore  
                                                        order.id.slice(0, 8).toUpperCase()}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-body border ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <p className="text-neutral-500 text-xs font-body truncate">
                                                    {order.items.map(item => `${item.productName} x${item.quantity}`).join(', ')}
                                                </p>
                                            </div>

                                            <div className="text-right flex-shrink-0">
                                                <p className="font-body font-semibold text-amber-500">
                                                    {formatPrice(order.totalAmount)}
                                                </p>
                                                <p className="text-neutral-600 text-xs font-body flex items-center gap-1 justify-end">
                                                    <Calendar className="w-3 h-3" />
                                                    {formatDate(order.pickupDate)}
                                                </p>
                                            </div>

                                            {isExpanded ? (
                                                <ChevronUp className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                                            )}
                                        </div>

                                        {/* Expanded Details */}
                                        {isExpanded && (
                                            <div className="px-5 pb-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                                {/* Items */}
                                                <div className="bg-neutral-800/50 rounded-xl p-4">
                                                    <h4 className="text-xs text-neutral-500 font-body mb-3 uppercase tracking-wide">Order Items</h4>
                                                    <ul className="space-y-3">
                                                        {order.items.map((item, idx) => (
                                                            <li key={idx} className="flex justify-between items-start">
                                                                <div>
                                                                    <span className="text-white font-body">
                                                                        {item.quantity}x {item.productName}
                                                                    </span>
                                                                    {item.variantName && (
                                                                        <span className="block text-amber-500 text-xs font-body">
                                                                            {item.variantName}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <span className="text-neutral-300 font-body">
                                                                    {formatPrice(item.price * item.quantity)}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="border-t border-neutral-700 mt-4 pt-4 flex justify-between">
                                                        <span className="text-neutral-400 font-body font-medium">Total</span>
                                                        <span className="text-amber-500 font-body font-bold text-lg">
                                                            {formatPrice(order.totalAmount)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Pickup Info */}
                                                <div className="bg-neutral-800/50 rounded-xl p-4">
                                                    <h4 className="text-xs text-neutral-500 font-body mb-3 uppercase tracking-wide">Pickup Details</h4>
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 rounded-lg bg-amber-500/10">
                                                            <Calendar className="w-4 h-4 text-amber-500" />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-body font-medium">
                                                                {formatDate(order.pickupDate)} at {order.pickupTime}
                                                            </p>
                                                            <p className="text-neutral-400 font-body text-sm">
                                                                Solrosgatan 11, Göteborg
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                {order.notes && (
                                                    <div className="bg-neutral-800/50 rounded-xl p-4">
                                                        <h4 className="text-xs text-neutral-500 font-body mb-2 uppercase tracking-wide">Notes</h4>
                                                        <p className="text-neutral-300 font-body text-sm">{order.notes}</p>
                                                    </div>
                                                )}

                                                {/* Cancel Button */}
                                                {canCancelOrder(order.status) && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                             // @ts-ignore  
                                                            openCancelModal(order.id);
                                                        }}
                                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-body font-medium text-sm rounded-xl transition-all"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Cancel Order
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                </div>
            </main>

            {/* Cancel Modal */}
            {showCancelModal && (
                <>
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        onClick={() => setShowCancelModal(false)}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-white mb-2">
                                Cancel Order?
                            </h3>
                            <p className="text-neutral-400 font-body text-sm mb-6">
                                Are you sure? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCancelModal(false)}
                                    className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-body font-medium text-sm rounded-xl transition-all"
                                >
                                    Keep Order
                                </button>
                                <button
                                    onClick={handleCancelOrder}
                                    disabled={isCancelling}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-400 text-white font-body font-semibold text-sm rounded-xl transition-all disabled:opacity-50"
                                >
                                    {isCancelling ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /></>
                                    ) : (
                                        'Cancel'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OrderHistory;