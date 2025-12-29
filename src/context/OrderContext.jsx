import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function useOrders() {
    return useContext(OrderContext);
}


export function OrderProvider({ children }) {
    // Persistent orders using localStorage
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('sp_orders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('sp_orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order) => {
        // Add status: 'ongoing' by default
        setOrders(prev => [
            { ...order, status: 'ongoing' },
            ...prev
        ]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
}
