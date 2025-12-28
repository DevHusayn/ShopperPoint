import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartConflictModal = () => {
    const { conflictData, setConflictData, resolveConflict, activeStore } = useCart();

    return (
        <AnimatePresence>
            {conflictData && (
                <>
                    {/* Dark Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={() => setConflictData(null)}
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-[101] p-0 sm:p-4 pointer-events-none">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="bg-white w-full max-w-md pointer-events-auto rounded-t-[2rem] sm:rounded-[2rem] p-8"
                        >
                            <div className="flex justify-center -mt-16 mb-6">
                                <div className="bg-white p-4 rounded-full shadow-lg text-brand-orange">
                                    <AlertCircle size={40} />
                                </div>
                            </div>

                            <div className="text-center">
                                <h2 className="text-xl font-bold text-brand-navy mb-2">Start a new cart?</h2>
                                <p className="text-gray-500 text-sm mb-8">
                                    You already have items from <span className="font-bold text-brand-navy">{activeStore?.brand}</span>.
                                    To shop from <span className="font-bold text-brand-orange">{conflictData.store.brand}</span>, we need to clear your current cart.
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={resolveConflict}
                                        className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold active:scale-95 transition-all"
                                    >
                                        Clear Cart & Fresh Start
                                    </button>
                                    <button
                                        onClick={() => setConflictData(null)}
                                        className="w-full py-2 text-gray-400 font-bold text-sm"
                                    >
                                        Keep Current Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartConflictModal;