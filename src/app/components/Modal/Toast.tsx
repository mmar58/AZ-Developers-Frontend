
import React, { useEffect } from 'react';
import CheckCircleIcon from '../../assets/icons/CheckCircleIcon';
import XCircleIcon from '../../assets/icons/XCircleIcon';
import InformationCircleIcon from '../../assets/icons/InformationCircleIcon';
import XIcon from '../../assets/icons/XIcon';

// ToastType defines the type of notification to show
export type ToastType = 'success' | 'error' | 'info';

// ToastState describes the state of the toast notification
export interface ToastState {
    show: boolean; // Whether the toast is visible
    message: string; // Message to display
    type: ToastType; // Type of toast (success, error, info)
}

// Props for the Toast component
interface ToastProps {
    toast: ToastState; // Toast state object
    onClose: () => void; // Callback to close the toast
}

// Icon mapping for each toast type
const icons: Record<ToastType, React.FC<{className?: string}>> = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon,
};

// Color mapping for each toast type
const colors: Record<ToastType, string> = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
};

// Toast component displays a notification at the bottom left of the screen
const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
    const { show, message, type } = toast;

    // Auto-close the toast after 4 seconds
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    // Select the appropriate icon for the toast type
    const Icon = icons[type];

    return (
        // Toast container
        <div
            className={`fixed bottom-5 left-5 z-50 transform transition-all duration-300 ease-in-out ${show ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
            role="alert"
            aria-live="assertive"
        >
            {/* Toast content */}
            <div className="flex items-center bg-slate-800 text-white rounded-lg shadow-2xl p-4 border border-slate-700 min-w-[320px]">
                {/* Icon */}
                <div className={`flex-shrink-0 w-6 h-6 ${colors[type]}`}> 
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {/* Message */}
                <div className="ml-3 text-sm font-medium text-slate-200">
                    {message}
                </div>
                {/* Close button */}
                <button 
                    onClick={onClose} 
                    className="ml-auto -mx-1.5 -my-1.5 p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg focus:ring-2 focus:ring-slate-600 inline-flex h-8 w-8"
                    aria-label="Close"
                >
                    <span className="sr-only">Close</span>
                    <XIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
};

export default Toast;
