import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

function TestComponent() {
    const { addToCart, conflictData, activeStore, cart } = useCart();
    return (
        <div>
            <button onClick={() => addToCart({ id: 1, name: 'A' }, { id: 'store1', brand: 'Jendol' })}>Add Jendol</button>
            <button onClick={() => addToCart({ id: 2, name: 'B' }, { id: 'store2', brand: 'Justrite' })}>Add Justrite</button>
            <div data-testid="conflict">{conflictData ? 'yes' : 'no'}</div>
            <div data-testid="activeStore">{activeStore?.brand || ''}</div>
            <div data-testid="cartCount">{cart.length}</div>
        </div>
    );
}

describe('CartContext', () => {
    it('Cart conflict triggers modal', () => {
        const { getByText, getByTestId } = render(<CartProvider><TestComponent /></CartProvider>);
        act(() => getByText('Add Jendol').click());
        expect(getByTestId('conflict').textContent).toBe('no');
        act(() => getByText('Add Justrite').click());
        expect(getByTestId('conflict').textContent).toBe('yes');
    });
});