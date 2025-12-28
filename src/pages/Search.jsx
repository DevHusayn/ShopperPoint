import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon, X, Plus } from 'lucide-react';
import { PRODUCTS, MALL_BRANCHES } from '../utils/mockData';
import { useCart } from '../context/CartContext';
import { formatNaira } from '../utils/formatters';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const filteredProducts = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            <header className="p-4 border-b border-gray-100 sticky top-0 bg-white z-50">
                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
                    <ArrowLeft size={20} onClick={() => navigate(-1)} />
                    <input
                        autoFocus
                        className="bg-transparent flex-1 outline-none text-sm"
                        placeholder="Search all nearby malls..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && <X size={18} onClick={() => setQuery('')} />}
                </div>
            </header>

            <main className="p-4">
                {!query ? (
                    <div className="pt-10 text-center">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <SearchIcon className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 text-sm">Type to find items in your area</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="flex items-center justify-between border-b border-gray-50 pb-4">
                                <div className="flex gap-4 items-center">
                                    <img src={product.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                                    <div>
                                        <h4 className="text-sm font-bold text-brand-navy">{product.name}</h4>
                                        <p className="text-brand-orange font-bold text-xs">{formatNaira(product.price)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => addToCart(product, MALL_BRANCHES[0])}
                                    className="bg-brand-orange text-white p-2 rounded-full"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchPage;