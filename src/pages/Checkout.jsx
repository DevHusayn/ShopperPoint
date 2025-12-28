import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, ShieldCheck, CreditCard, Info, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatNaira } from '../utils/formatters';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, activeStore, subtotal, clearCart } = useCart();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    // Business Logic: Fixed fees for Lagos Hyperlocal
    const deliveryFee = 1200;
    const serviceFee = 250;
    const total = subtotal + deliveryFee + serviceFee;

    const handlePayment = () => {
        setIsProcessing(true);

        // Simulate Paystack Gateway Delay
        setTimeout(() => {
            setIsProcessing(false);
            // In a real app, we would save to Supabase here
            alert("Payment Successful! Your order has been sent to " + activeStore.brand);

            // We clear the cart but usually we'd pass an Order ID to Tracking
            navigate('/tracking');
        }, 2500);
    };

    // Guard: If cart is empty, redirect home
    if (cart.length === 0) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4 text-4xl">🛒</div>
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
        <div className="min-h-screen bg-gray-50 pb-40">
            {/* Trust Header */}
            <header className="bg-white px-4 py-4 border-b border-gray-100 sticky top-0 z-10 flex items-center gap-4">
                <button onClick={() => navigate(-1)}><ChevronLeft className="text-brand-navy" /></button>
                <h1 className="text-lg font-bold text-brand-navy">Checkout</h1>
                <div className="ml-auto flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded">
                    <ShieldCheck size={12} /> SECURE
                </div>
            </header>

            <div className="max-w-xl mx-auto p-4 space-y-4">
                {/* Order Summary Card */}
                <section className="bg-white rounded-2xl p-4 shadow-sm">
                    <h2 className="text-[10px] uppercase font-black text-gray-400 mb-4 tracking-widest">Items from {activeStore?.brand}</h2>
                    <div className="divide-y divide-gray-50">
                        {cart.map(item => (
                            <div key={item.id} className="py-3 flex justify-between items-center">
                                <div className="flex gap-3">
                                    <span className="text-brand-orange font-bold text-sm">{item.quantity}x</span>
                                    <span className="text-sm font-medium text-brand-navy">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold text-brand-navy">{formatNaira(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Delivery Address Card */}
                <section className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-brand-orange">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Delivery Address</h2>
                        <button className="text-xs font-bold text-brand-orange">Change</button>
                    </div>
                    <div className="flex gap-3 items-start">
                        <MapPin className="text-brand-orange mt-1" size={18} />
                        <div>
                            <p className="text-sm font-bold text-brand-navy">Home</p>
                            <p className="text-xs text-gray-500 leading-relaxed">Plot 12, Admiralty Way, Lekki Phase 1, Lagos</p>
                            <div className="mt-2 bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold inline-block">
                                Landmark: Near the big yellow gate
                            </div>
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
                            <span className="text-gray-500 flex items-center gap-1">Delivery Fee <Info size={12} /></span>
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
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                <div className="max-w-xl mx-auto">
                    <button
                        disabled={isProcessing}
                        onClick={handlePayment}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isProcessing ? 'bg-gray-200 text-gray-400' : 'bg-brand-orange text-white shadow-lg active:scale-95'
                            }`}
                    >
                        <CreditCard size={20} />
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