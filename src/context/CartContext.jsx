import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Initialize State from LocalStorage (Persistence)
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('sp_cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [activeStore, setActiveStore] = useState(() => {
        const saved = localStorage.getItem('sp_active_store');
        return saved ? JSON.parse(saved) : null;
    });

    const [lastUpdated, setLastUpdated] = useState(() => {
        const saved = localStorage.getItem('sp_cart_time');
        return saved ? JSON.parse(saved) : Date.now();
    });

    const [conflictData, setConflictData] = useState(null); // For the "Clear Cart?" modal

    // 2. Save to LocalStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('sp_cart', JSON.stringify(cart));
        localStorage.setItem('sp_active_store', JSON.stringify(activeStore));
        localStorage.setItem('sp_cart_time', JSON.stringify(lastUpdated));
    }, [cart, activeStore, lastUpdated]);

    // 3. The "Single-Store Guard" Logic
    const addToCart = (product, store) => {
        // If user tries to mix stores, trigger the conflict modal
        if (activeStore && activeStore.id !== store.id && cart.length > 0) {
            setConflictData({ product, store });
            return;
        }

        // Set the store if it's the first item
        if (!activeStore) setActiveStore(store);

        setLastUpdated(Date.now());

        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing.quantity === 1) {
                const newCart = prev.filter(item => item.id !== productId);
                if (newCart.length === 0) setActiveStore(null); // Reset store if cart empty
                return newCart;
            }
            return prev.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    const clearCart = () => {
        setCart([]);
        setActiveStore(null);
        setConflictData(null);
    };

    // Logic for the Conflict Modal to use
    const resolveConflict = () => {
        if (conflictData) {
            setCart([{ ...conflictData.product, quantity: 1 }]);
            setActiveStore(conflictData.store);
            setConflictData(null);
        }
    };

    // 4. Global Calculations (Naira ₦)
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart, activeStore, conflictData, setConflictData,
            addToCart, removeFromCart, clearCart, resolveConflict,
            subtotal, cartCount, lastUpdated
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);