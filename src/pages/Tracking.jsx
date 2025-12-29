import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStore, faMotorcycle, faHome, faPhone, faChevronDown, faChevronUp, faArrowLeft, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

import { useOrders } from '../context/OrderContext';
import { formatNaira } from '../utils/formatters';

const STEPS = [
    { id: 1, label: 'Order Confirmed', icon: faCheckCircle, desc: 'Your order is being processed' },
    { id: 2, label: 'Rider at Store', icon: faStore, desc: 'Tunde is picking up your items' },
    { id: 3, label: 'Out for Delivery', icon: faMotorcycle, desc: 'Rider is heading to your location' },
    { id: 4, label: 'Arrived', icon: faHome, desc: 'Enjoy your shopping!' },
];

const Tracking = () => {

    const navigate = useNavigate();
    const { orders } = useOrders();
    // Show the most recent order (assume first in array)
    const latestOrder = orders && orders.length > 0 ? orders[0] : null;

    const [currentStep, setCurrentStep] = useState(2); // Simulated progress
    const [showSummary, setShowSummary] = useState(false);

    // Mock progression: Move the rider every 10 seconds for the demo
    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentStep < 4) setCurrentStep(prev => prev + 1);
        }, 10000);
        return () => clearTimeout(timer);
    }, [currentStep]);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Custom Back Button */}
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
                <div className="max-w-screen-xl mx-auto flex items-center gap-4">
                    <button onClick={() => navigate('/orders?tab=ongoing')} className="p-2 hover:bg-gray-100 rounded-full">
                        <FontAwesomeIcon icon={faArrowLeft} className="text-brand-navy" />
                    </button>
                    <h1 className="font-outfit font-bold text-brand-navy text-lg flex-1 text-center">Track Order</h1>
                </div>
            </nav>

            {/* Simulated Live Map Section */}
            <div className="relative h-[280px] w-full bg-slate-200 overflow-hidden">
                {/* Simple Map Background Placeholder */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/3.3422,6.5913,13/600x400?access_token=mock')] bg-cover bg-center" />

                {/* Floating ETA Info */}
                <div className="absolute top-4 left-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-brand-orange/10 p-2 rounded-lg text-brand-orange">
                                <FontAwesomeIcon icon={faClock} size="lg" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Estimated Arrival</p>
                                <p className="text-lg font-black text-brand-navy">12 - 18 mins</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Moving Rider Icon (Framer Motion) */}
                <motion.div
                    initial={{ x: "10%", y: 180 }}
                    animate={{
                        x: currentStep >= 3 ? "70%" : "30%",
                        y: currentStep >= 3 ? 60 : 140
                    }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                    className="absolute z-10"
                >
                    <div className="relative">
                        <div className="bg-brand-navy p-2.5 rounded-full shadow-2xl border-2 border-white text-white">
                            <FontAwesomeIcon icon={faMotorcycle} size="lg" />
                        </div>
                        <div className="absolute inset-0 bg-brand-navy rounded-full animate-ping opacity-20" />
                    </div>
                </motion.div>
            </div>

            <div className="max-w-xl mx-auto -mt-8 relative z-30 px-4 space-y-4">
                {/* Rider Profile Card */}
                <section className="bg-white rounded-[2rem] p-5 shadow-xl flex items-center justify-between border border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden border-2 border-orange-100">
                            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150" alt="Rider" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold text-brand-navy text-lg">Tunde</h3>
                            <div className="flex items-center gap-1">
                                <span className="text-brand-orange font-black text-xs">★ 4.9</span>
                                <span className="text-gray-400 text-[10px] font-bold">• Top Rated Rider</span>
                            </div>
                        </div>
                    </div>
                    <a href="tel:08000000000" className="bg-green-500 p-4 rounded-2xl text-white shadow-lg shadow-green-100 active:scale-90 transition-transform">
                        <FontAwesomeIcon icon={faPhone} size="lg" />
                    </a>
                </section>

                {/* Status Stepper */}
                <section className="bg-white rounded-[2rem] p-6 shadow-sm">
                    <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Delivery Progress</h2>
                    <div className="space-y-10">
                        {STEPS.map((step, idx) => {
                            const isCompleted = currentStep > step.id;
                            const isActive = currentStep === step.id;

                            return (
                                <div key={step.id} className="relative flex gap-5">
                                    {/* Vertical Progress Line */}
                                    {idx !== STEPS.length - 1 && (
                                        <div className={`absolute left-[19px] top-10 w-[2px] h-10 ${isCompleted ? 'bg-green-500' : 'bg-gray-100'}`} />
                                    )}

                                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-green-500 text-white' :
                                        isActive ? 'bg-brand-orange text-white ring-8 ring-orange-50' :
                                            'bg-gray-100 text-gray-300'
                                        }`}>
                                        <FontAwesomeIcon icon={step.icon} size="lg" />
                                    </div>

                                    <div>
                                        <p className={`font-bold text-sm ${isActive ? 'text-brand-navy' : isCompleted ? 'text-gray-600' : 'text-gray-300'}`}>
                                            {step.label}
                                        </p>
                                        <p className="text-xs text-gray-400">{step.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Collapsible Order Items */}
                <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <button
                        onClick={() => setShowSummary(!showSummary)}
                        className="w-full p-5 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-bold text-sm text-brand-navy">View Order Items</span>
                        {showSummary ? <FontAwesomeIcon icon={faChevronUp} size="lg" /> : <FontAwesomeIcon icon={faChevronDown} size="lg" />}
                    </button>

                    <AnimatePresence>
                        {showSummary && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden border-t border-gray-100"
                            >
                                <div className="p-5 space-y-4">
                                    {latestOrder ? (
                                        <>
                                            {latestOrder.items.map(item => (
                                                <div key={item.id} className="flex justify-between items-center text-sm">
                                                    <div className="flex gap-3">
                                                        <span className="text-brand-orange font-bold">{item.quantity}x</span>
                                                        <span className="text-gray-600 font-medium">{item.name}</span>
                                                    </div>
                                                    <span className="font-bold text-brand-navy">{formatNaira(item.price * item.quantity)}</span>
                                                </div>
                                            ))}
                                            <div className="pt-4 border-t border-dashed space-y-2 font-black">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 uppercase text-[10px] tracking-widest">Items Total</span>
                                                    <span className="text-brand-navy text-base">{formatNaira(latestOrder.total - 1450)}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 uppercase text-[10px] tracking-widest">Delivery Fee</span>
                                                    <span className="text-brand-navy text-base">{formatNaira(1450)}</span>
                                                </div>
                                                <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                                                    <span className="text-gray-400 uppercase text-[10px] tracking-widest">Total Paid</span>
                                                    <span className="text-brand-navy text-lg">{formatNaira(latestOrder.total)}</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-gray-400 text-center">No order found.</div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </div>
    );
};

export default Tracking;