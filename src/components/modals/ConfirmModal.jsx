import React from 'react';

const ConfirmModal = ({ open, title, message, onConfirm, onCancel, confirmText = 'Yes', cancelText = 'Cancel' }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full text-center border border-red-100">
                <h2 className="text-lg font-bold text-brand-navy mb-2">{title}</h2>
                <p className="text-gray-500 mb-6">{message}</p>
                <div className="flex gap-3 justify-center">
                    <button className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold" onClick={onConfirm}>{confirmText}</button>
                    <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl font-bold" onClick={onCancel}>{cancelText}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
