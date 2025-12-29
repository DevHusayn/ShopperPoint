import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function useOrders() {
    return useContext(OrderContext);
}

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('orders');
        if (saved) setOrders(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order) => {
        setOrders(prev => [order, ...prev]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
}
