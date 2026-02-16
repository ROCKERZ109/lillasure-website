"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

type MessageType = 'error' | 'success' | 'info';

interface AlertProps {
    message: string;
    type: MessageType;
    onDismiss?: () => void;
    autoClose?: number;
}

const AlertDialog = ({ message, type, onDismiss, autoClose = 5000 }: AlertProps) => {
    
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onDismiss?.();
            }, autoClose);
            return () => clearTimeout(timer);
        }
    }, [autoClose, onDismiss]);

    if (!isVisible) return null;

    const config = {
        success: {
            icon: CheckCircle2,
            border: 'border-amber-500/30',
            iconColor: 'text-amber-500',
            textColor: 'text-amber-200',
        },
        error: {
            icon: AlertCircle,
            border: 'border-red-500/30',
            iconColor: 'text-red-500',
            textColor: 'text-red-200',
        },
        info: {
            icon: Info,
            border: 'border-neutral-500/30',
            iconColor: 'text-neutral-400',
            textColor: 'text-neutral-300',
        },
    };
    const { icon: Icon, border, iconColor, textColor } = config[type];
    return (
        <div className={`
            flex items-center gap-3 
            px-4 py-3 
            bg-neutral-800/80 backdrop-blur-sm
            border ${border} 
            rounded-xl
        `}>
            <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
            <p className={`font-body text-sm ${textColor} flex-1`}>{message}</p>
            {onDismiss && (
                <button
                    onClick={() => { setIsVisible(false); onDismiss(); }}
                    className="text-neutral-500 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default AlertDialog;