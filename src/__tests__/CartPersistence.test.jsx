import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

describe('Cart Persistence', () => {
    beforeEach(() => localStorage.clear());
    it('Cart persists in localStorage', () => {
        function Test() {
            const { addToCart, cart } = useCart();
            React.useEffect(() => {
                addToCart({ id: 1, name: 'A' }, { id: 'store1', brand: 'Jendol' });
            }, []);
            return <div data-testid="cartCount">{cart.length}</div>;
        }
        render(<CartProvider><Test /></CartProvider>);
        expect(JSON.parse(localStorage.getItem('sp_cart')).length).toBe(1);
    });
});