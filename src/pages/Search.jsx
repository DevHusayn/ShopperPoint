import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PRODUCTS, MALL_BRANCHES } from '../utils/mockData';
import { useLocationContext } from '../context/LocationContext';
import { useCart } from '../context/CartContext';
import CartConflictModal from '../components/modals/CartConflictModal';
import { formatNaira } from '../utils/formatters';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [showCartSummary, setShowCartSummary] = useState(false);
    const { location } = useLocationContext();
    const navigate = useNavigate();
    const { addToCart, activeStore, cart, conflictData } = useCart();

    // Find the accent color for the active store
    const activeStoreAccent = activeStore ? (MALL_BRANCHES.find(m => m.brand === activeStore.brand)?.accent || 'bg-brand-orange') : 'bg-brand-orange';

    // Memoize filtered products for performance
    const filteredProducts = React.useMemo(() =>
        PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
        [query]
    );

    return (
        <div className="min-h-screen bg-white">
            <header className="p-2 sm:p-4 border-b border-gray-100 sticky top-0 bg-white z-50">
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 p-2 sm:p-3 rounded-xl">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => navigate(-1)} />
                    <input
                        autoFocus
                        className="bg-transparent flex-1 outline-none text-sm"
                        placeholder="Search all nearby malls..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && <FontAwesomeIcon icon={faTimes} size="sm" onClick={() => setQuery('')} />}
                </div>
            </header>

            <main className="p-2 sm:p-4">
                {!query ? (
                    <div className="pt-10 text-center">
                        <div className="bg-gray-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-300" size="2x" />
                        </div>
                        <p className="text-gray-400 text-sm">Type to find items in your area</p>
                    </div>
                ) : (
                    <div className="space-y-3 sm:space-y-4">
                        {filteredProducts.map(product => {
                            // Find all malls that match the product's brand
                            const matchingMalls = MALL_BRANCHES.filter(mall => mall.brand === product.brand);
                            return matchingMalls.length > 0 ? (
                                <div key={product.id} className="border-b border-gray-50 pb-3 sm:pb-4">
                                    <div className="flex gap-2 sm:gap-4 items-center">
                                        <img src={product.image} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover" alt="" loading="lazy" />
                                        <div>
                                            <h4 className="text-sm font-bold text-brand-navy">{product.name}</h4>
                                            <p className="text-brand-orange font-bold text-xs">{formatNaira(product.price)}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 space-y-2">
                                        {matchingMalls.map(mall => (
                                            <div key={mall.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                                <div>
                                                    <span className="font-semibold text-brand-navy">{mall.brand}</span>
                                                    <span className="text-xs text-gray-400 ml-1">({mall.branchName})</span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        addToCart(product, mall);
                                                        setShowCartSummary(true);
                                                        setTimeout(() => setShowCartSummary(false), 4000);
                                                    }}
                                                    className="bg-brand-orange text-white p-2 rounded-full"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} size="sm" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </div>
                )}
            </main>
            {/* Floating Cart Summary */}
            {showCartSummary && cart.length > 0 && (
                <div className={`fixed bottom-24 right-4 z-50 shadow-xl rounded-2xl p-4 w-72 max-w-full animate-fade-in border-2 ${activeStoreAccent} bg-white`}>
                    <h4 className="font-bold text-brand-navy mb-2">Cart Updated</h4>
                    <ul className="divide-y divide-gray-100 max-h-40 overflow-y-auto">
                        {cart.map(item => (
                            <li key={item.id} className="flex justify-between items-center py-1 text-sm">
                                <span>{item.quantity}x {item.name}</span>
                                <span className="font-bold text-brand-orange">₦{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Cart Conflict Modal */}
            <CartConflictModal />
        </div>
    );
};

export default SearchPage;