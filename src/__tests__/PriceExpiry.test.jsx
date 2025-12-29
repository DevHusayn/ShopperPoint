import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

function Test() {
    const { lastUpdated } = useCart();
    const isExpired = Date.now() - lastUpdated > 24 * 60 * 60 * 1000;
    return <div data-testid="expired">{isExpired ? 'yes' : 'no'}</div>;
}

describe('Price Expiry', () => {
    it('Warn if cart is older than 24h', () => {
        // Simulate old cart
        localStorage.setItem('sp_cart_time', JSON.stringify(Date.now() - 25 * 60 * 60 * 1000));
        const { getByTestId } = render(<CartProvider><Test /> </CartProvider>);
        expect(getByTestId('expired').textContent).toBe('yes');
    });
});