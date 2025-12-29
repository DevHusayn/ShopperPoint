import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faShoppingCart, faTruck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';

const Orders = () => {
    const { orders } = useOrders();
    const { cart, cartCount, cartTotal, activeStore } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const getInitialTab = () => {
        const params = new URLSearchParams(location.search);
        const t = params.get('tab');
        if (t === 'ongoing' || t === 'completed' || t === 'cart') return t;
        return 'cart';
    };
    const [tab, setTab] = useState(getInitialTab());

    // Example: Ongoing = orders without a delivered flag, Completed = orders with delivered flag
    // For demo, treat the first order as ongoing, rest as completed
    const ongoingOrders = orders.length > 0 ? [orders[0]] : [];
    const completedOrders = orders.length > 1 ? orders.slice(1) : [];

    return (
        <div className="min-h-screen bg-white p-0">
            {/* Tabs */}
            <div className="flex justify-around border-b border-gray-100 bg-white sticky top-0 z-10">
                <button onClick={() => setTab('cart')} className={`flex-1 py-4 font-bold ${tab === 'cart' ? 'text-brand-orange border-b-2 border-brand-orange bg-orange-50' : 'text-gray-400'}`}>
                    My Cart
                </button>
                <button onClick={() => setTab('ongoing')} className={`flex-1 py-4 font-bold ${tab === 'ongoing' ? 'text-brand-orange border-b-2 border-brand-orange bg-orange-50' : 'text-gray-400'}`}>
                    Ongoing
                </button>
                <button onClick={() => setTab('completed')} className={`flex-1 py-4 font-bold ${tab === 'completed' ? 'text-brand-orange border-b-2 border-brand-orange bg-orange-50' : 'text-gray-400'}`}>
                    Completed
                </button>
            </div>

            {/* Tab Content */}
            <div className="p-4">
                {tab === 'cart' && (
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-brand-navy flex items-center gap-2"><FontAwesomeIcon icon={faShoppingCart} /> My Cart</h2>
                        {cartCount === 0 ? (
                            <div className="flex flex-col items-center justify-center mt-10">
                                <FontAwesomeIcon icon={faBoxOpen} size="2x" className="text-brand-orange mb-2" />
                                <p className="text-gray-500 mb-6">Your cart is empty.</p>
                                <button onClick={() => navigate('/')} className="bg-brand-orange text-white px-6 py-2 rounded-xl font-bold">Start Shopping</button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
                                <div className="mb-2 font-bold text-brand-orange">{activeStore?.brand}</div>
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between py-2 text-sm">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span className="font-bold text-brand-navy">₦{item.price * item.quantity}</span>
                                    </div>
                                ))}
                                <div className="pt-2 text-right font-black text-brand-navy">Total: ₦{cartTotal}</div>
                                <button onClick={() => navigate('/checkout')} className="mt-4 bg-brand-orange text-white px-4 py-2 rounded-xl font-bold w-full">Checkout</button>
                            </div>
                        )}
                    </div>
                )}
                {tab === 'ongoing' && (
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-brand-navy flex items-center gap-2"><FontAwesomeIcon icon={faTruck} /> Ongoing Orders</h2>
                        {ongoingOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center mt-10">
                                <FontAwesomeIcon icon={faBoxOpen} size="2x" className="text-brand-orange mb-2" />
                                <p className="text-gray-500 mb-6">No ongoing orders.</p>
                            </div>
                        ) : (
                            ongoingOrders.map((order, idx) => (
                                <div key={order.id} className="bg-white rounded-2xl shadow p-4 border border-gray-100 mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-brand-orange">{order.store}</span>
                                        <span className="text-xs text-gray-400">{order.date}</span>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {order.items.map(item => (
                                            <div key={item.id} className="py-2 flex justify-between text-sm">
                                                <span>{item.quantity}x {item.name}</span>
                                                <span className="font-bold text-brand-navy">₦{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-2 text-right font-black text-brand-navy">Total: ₦{order.total}</div>
                                    <button className="mt-4 bg-brand-orange text-white px-4 py-2 rounded-xl font-bold w-full" onClick={() => navigate('/tracking')}>Track This Order</button>
                                </div>
                            ))
                        )}
                    </div>
                )}
                {tab === 'completed' && (
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-brand-navy flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} /> Completed Orders</h2>
                        {completedOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center mt-10">
                                <FontAwesomeIcon icon={faBoxOpen} size="2x" className="text-brand-orange mb-2" />
                                <p className="text-gray-500 mb-6">No completed orders yet.</p>
                            </div>
                        ) : (
                            completedOrders.map(order => (
                                <div key={order.id} className="bg-white rounded-2xl shadow p-4 border border-gray-100 mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-brand-orange">{order.store}</span>
                                        <span className="text-xs text-gray-400">{order.date}</span>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {order.items.map(item => (
                                            <div key={item.id} className="py-2 flex justify-between text-sm">
                                                <span>{item.quantity}x {item.name}</span>
                                                <span className="font-bold text-brand-navy">₦{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-2 text-right font-black text-brand-navy">Total: ₦{order.total}</div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
