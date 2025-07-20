
import React, { useState, useEffect } from 'react';
import XIcon from '../../assets/icons/XIcon';
import type { ToastState } from './Toast';

// ContactModal displays a modal dialog for users to send a message to AZ Developers.
// It supports toast notifications for feedback and resets its form on close.

interface ContactModalProps {
    isOpen: boolean; // Whether the modal is open
    onClose: () => void; // Callback to close the modal
    setToast: (toast: ToastState) => void; // Function to show toast notifications
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, setToast }) => {
    // Form state
    const [reason, setReason] = useState('General Inquiry');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal closes (with delay for animation)
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setReason('General Inquiry');
                setMessage('');
                setIsSubmitting(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Allow closing modal with Escape key
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) {
            alert("Please enter a message.");
            return;
        }
        setIsSubmitting(true);
        onClose(); // Close modal immediately after submit
        setToast({ show: true, message: 'Sending your message...', type: 'info' });
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // Simulate success response
            setToast({ show: true, message: 'Message sent successfully!', type: 'success' });
        }, 1500);
    };

    return (
        // Modal overlay
        <div
            className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
            aria-hidden={!isOpen}
            role="dialog"
            aria-modal="true"
        >
            {/* Modal content */}
            <div
                className={`bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg p-8 relative transition-all duration-300 ease-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    aria-label="Close modal"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                {/* Modal title */}
                <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
                {/* Contact form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-slate-300 mb-2">
                            Reason for contact
                        </label>
                        <select
                            id="reason"
                            name="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        >
                            <option>General Inquiry</option>
                            <option>Project Proposal</option>
                            <option>Job Opportunity</option>
                            <option>Feedback</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us more..."
                            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full justify-center px-8 py-3 bg-indigo-500 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;
