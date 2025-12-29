import React, { useState } from 'react';
import ConfirmModal from '../components/modals/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faMapMarkerAlt, faShieldAlt, faCreditCard, faInfoCircle, faExclamationTriangle, faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { formatNaira } from '../utils/formatters';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, activeStore, subtotal, clearCart, removeFromCart, selectedAddress } = useCart();
    const { user } = useAuth();
    const { addOrder } = useOrders();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState({ open: false, itemId: null });

    // Business Logic: Fixed fees for Lagos Hyperlocal
    const deliveryFee = 1200;
    const serviceFee = 250;
    const total = subtotal + deliveryFee + serviceFee;

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            // Save order to context/localStorage
            addOrder({
                id: Date.now(),
                store: activeStore?.brand,
                items: cart,
                total,
                date: new Date().toLocaleString(),
            });
            setShowSuccessModal(true);
        }, 2500);
    };

    // Guard: If cart is empty, redirect home
    if (cart.length === 0) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4 text-4xl">
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                </div>
                <h2 className="text-xl font-bold text-brand-navy">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Add some items from a store to continue.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-56 mb-24">
            {/* Payment Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full text-center border border-green-100">
                        <div className="mb-4 text-green-500">
                            <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                        </div>
                        <h2 className="text-lg font-bold text-brand-navy mb-2">Payment Successful!</h2>
                        <p className="text-sm text-gray-500 mb-4">Your order has been sent to <span className="font-bold text-brand-orange">{activeStore?.brand}</span>.</p>
                        <button
                            className="bg-brand-orange text-white px-6 py-2 rounded-xl font-bold w-full mt-2"
                            onClick={() => {
                                clearCart();
                                setShowSuccessModal(false);
                                navigate('/orders?tab=ongoing');
                            }}
                        >Track Order</button>
                    </div>
                </div>
            )}
            {/* Trust Header (retained) */}
            <header className="bg-white px-4 py-4 border-b border-gray-100 sticky top-0 z-10 flex items-center gap-4">
                <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft} className="text-brand-navy" /></button>
                <h1 className="text-lg font-bold text-brand-navy">Checkout</h1>
                <div className="ml-auto flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded">
                    <FontAwesomeIcon icon={faShieldAlt} size="xs" /> SECURE
                </div>
            </header>

            <div className="max-w-xl mx-auto p-4 space-y-4">
                {/* Order Summary Card */}
                <section className="bg-white rounded-2xl p-4 shadow-sm">
                    <h2 className="text-[10px] uppercase font-black text-gray-400 mb-4 tracking-widest">Items from {activeStore?.brand}</h2>
                    <div className="divide-y divide-gray-50">
                        {cart.map(item => (
                            <div key={item.id} className="py-3 flex justify-between items-center">
                                <div className="flex gap-3 items-center">
                                    <span className="text-brand-orange font-bold text-sm">{item.quantity}x</span>
                                    <span className="text-sm font-medium text-brand-navy">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-brand-navy">{formatNaira(item.price * item.quantity)}</span>
                                    <button
                                        className="ml-2 text-xs text-red-500 hover:text-white hover:bg-red-500 border border-red-200 rounded-full px-2 py-1 transition"
                                        title="Remove item"
                                        onClick={() => setConfirmRemove({ open: true, itemId: item.id })}
                                    >
                                        Remove
                                    </button>
                                    {/* Remove Item Confirmation Modal */}
                                    <ConfirmModal
                                        open={confirmRemove.open}
                                        title="Remove Item"
                                        message="Are you sure you want to remove this item from your cart?"
                                        confirmText="Remove"
                                        cancelText="Cancel"
                                        onConfirm={() => {
                                            removeFromCart(confirmRemove.itemId);
                                            setConfirmRemove({ open: false, itemId: null });
                                        }}
                                        onCancel={() => setConfirmRemove({ open: false, itemId: null })}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Delivery Address Card */}
                <section className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-brand-orange">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Delivery Address</h2>
                        <button className="text-xs font-bold text-brand-orange" onClick={() => navigate('/addresses')}>Change</button>
                    </div>
                    <div className="flex gap-3 items-start">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-brand-orange mt-1" size="18" />
                        <div>
                            <p className="text-sm font-bold text-brand-navy">{selectedAddress?.nickname || 'No Address Selected'}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.area}` : 'Please select a delivery address.'}</p>
                            {selectedAddress?.landmark && (
                                <div className="mt-2 bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold inline-block">
                                    Landmark: {selectedAddress.landmark}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Payment Breakdown Card */}
                <section className="bg-white rounded-2xl p-5 shadow-sm">
                    <h2 className="text-[10px] uppercase font-black text-gray-400 mb-4 tracking-widest">Payment Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-semibold text-brand-navy">{formatNaira(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 flex items-center gap-1">Delivery Fee <FontAwesomeIcon icon={faInfoCircle} size="12" /></span>
                            <span className="font-semibold text-brand-navy">{formatNaira(deliveryFee)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Service Fee</span>
                            <span className="font-semibold text-brand-navy">{formatNaira(serviceFee)}</span>
                        </div>
                        <div className="pt-4 border-t border-dashed flex justify-between items-center">
                            <span className="font-black text-brand-navy text-lg">Total</span>
                            <span className="text-2xl font-black text-brand-orange">{formatNaira(total)}</span>
                        </div>
                    </div>
                </section>

                {/* Cancellation Notice */}
                <p className="text-[10px] text-gray-400 text-center px-6">
                    By clicking Pay, you agree to ShopperPoint's terms of service.
                    Orders cannot be cancelled once the rider has reached the store.
                </p>
            </div>

            {/* Fixed "Pay Now" Button Container */}
            <div className="fixed bottom-13 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                <div className="max-w-xl mx-auto">
                    <button
                        disabled={isProcessing}
                        onClick={handlePayment}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isProcessing ? 'bg-gray-200 text-gray-400' : 'bg-brand-orange text-white shadow-lg active:scale-95'
                            }`}
                    >
                        <FontAwesomeIcon icon={faCreditCard} size="20" />
                        {isProcessing ? 'Connecting to Paystack...' : `Pay ${formatNaira(total)}`}
                    </button>
                    <div className="mt-3 flex items-center justify-center gap-2 grayscale opacity-50">
                        <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Secured by Paystack</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;