import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faBoxOpen, faMapMarkerAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from '../components/modals/ConfirmModal';

const Profile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    if (!user) {
        // If not logged in, redirect to login
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="flex flex-col items-center mb-8">
                <FontAwesomeIcon icon={faUserCircle} size="5x" className="text-brand-orange mb-2" />
                <h2 className="text-xl font-bold text-brand-navy">{user.name || 'Your Name'}</h2>
                <p className="text-gray-500">{user.email || 'your@email.com'}</p>
            </div>
            <div className="space-y-4">
                <button onClick={() => navigate('/orders')} className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl font-bold text-brand-navy hover:bg-orange-50">
                    <FontAwesomeIcon icon={faBoxOpen} /> My Orders
                </button>
                <button onClick={() => navigate('/addresses')} className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl font-bold text-brand-navy hover:bg-orange-50">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> My Addresses
                </button>
                <button onClick={() => navigate('/change-password')} className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl font-bold text-brand-navy hover:bg-orange-50">
                    <FontAwesomeIcon icon={faLock} /> Change Password
                </button>
            </div>
            <button onClick={() => setShowLogoutConfirm(true)} className="mt-10 w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100">
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
            {/* Logout Confirmation Modal */}
            <ConfirmModal
                open={showLogoutConfirm}
                title="Logout"
                message="Are you sure you want to logout?"
                confirmText="Logout"
                cancelText="Cancel"
                onConfirm={() => {
                    setShowLogoutConfirm(false);
                    signOut();
                }}
                onCancel={() => setShowLogoutConfirm(false)}
            />
        </div>
    );
};

export default Profile;
