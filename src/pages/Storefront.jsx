import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSearch, faPlus, faCheck, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MALL_BRANCHES, PRODUCTS } from '../utils/mockData';
import { useCart } from '../context/CartContext';
import { formatNaira } from '../utils/formatters';

const Storefront = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const { addToCart, cartCount, cartTotal } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [addedId, setAddedId] = useState(null);

    // Find store and products
    const store = MALL_BRANCHES.find(m => m.id === storeId) || MALL_BRANCHES[0];
    const categories = ['All', 'Bakery', 'Provisions', 'Drinks', 'Fresh Food'];

    // Dynamic Theme Mapping
    const theme = {
        Jendol: { accent: 'bg-purple-600', text: 'text-purple-600' },
        Justrite: { accent: 'bg-red-500', text: 'text-red-500' },
        Shoprite: { accent: 'bg-red-700', text: 'text-red-700' },
    }[store.brand] || { accent: 'bg-brand-orange', text: 'text-brand-orange' };

    const handleQuickAdd = (product) => {
        addToCart(product, store);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 800);
    };

    return (
        <div className="relative min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-gray-100 p-4">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => navigate('/')} className="p-1"><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <div className="text-center">
                        <h1 className="font-outfit font-bold text-brand-navy">{store.brand}</h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">{store.branchName}</p>
                    </div>
                    <button onClick={() => navigate('/search')}><FontAwesomeIcon icon={faSearch} size="lg" /></button>
                </div>

                {/* Categories Bar */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat ? `${theme.accent} text-white` : 'bg-gray-100 text-gray-500'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            {/* Product Grid */}
            <main className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 pb-32">
                {PRODUCTS.filter(p => selectedCategory === 'All' || p.category === selectedCategory).map(product => (
                    <div key={product.id} className="border border-gray-100 rounded-2xl p-3 flex flex-col group">
                        <div className="relative h-32 mb-3 bg-gray-50 rounded-xl overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            <button
                                onClick={() => handleQuickAdd(product)}
                                className={`absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${addedId === product.id ? 'bg-green-500' : 'bg-brand-orange'
                                    } text-white`}
                            >
                                {addedId === product.id ? <FontAwesomeIcon icon={faCheck} size="sm" /> : <FontAwesomeIcon icon={faPlus} size="lg" />}
                            </button>
                        </div>
                        <h3 className="text-xs font-bold text-brand-navy h-8 line-clamp-2">{product.name}</h3>
                        <p className="mt-1 text-brand-orange font-black text-sm">{formatNaira(product.price)}</p>
                    </div>
                ))}
            </main>

            {/* Floating Cart Bar */}
            {cartCount > 0 && (
                <div className="fixed bottom-20 left-4 right-4 z-50 animate-bounce-in">
                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-brand-navy text-white flex items-center justify-between p-4 rounded-2xl shadow-2xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-brand-orange px-2 py-1 rounded text-[10px] font-black">{cartCount}</div>
                            <span className="text-sm font-bold">View Cart from {store.brand}</span>
                        </div>
                        <span className="font-bold">{formatNaira(cartTotal)}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Storefront;