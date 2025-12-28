import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, ShoppingBag } from 'lucide-react';
import { MALL_BRANCHES } from '../utils/mockData';

const Discovery = () => {
    const navigate = useNavigate();

    return (
        <div className="pb-20">
            {/* Header Section */}
            <section className="bg-brand-navy p-6 pt-10 text-white rounded-b-[2rem]">
                <div className="flex items-center gap-2 mb-6">
                    <MapPin className="text-brand-orange" size={20} />
                    <div>
                        <p className="text-[10px] opacity-70 uppercase font-bold">Shopping in</p>
                        <p className="font-bold text-sm">Ikeja, Lagos</p>
                    </div>
                </div>

                <div className="relative">
                    <div
                        onClick={() => navigate('/search')}
                        className="flex bg-white rounded-xl items-center px-4 py-3 shadow-lg cursor-pointer"
                    >
                        <Search className="text-gray-400" size={20} />
                        <span className="ml-3 flex-1 text-gray-400 text-sm">Search bread, milk, eggs...</span>
                    </div>
                </div>
            </section>

            {/* Featured Malls */}
            <section className="mt-8 px-4">
                <h2 className="text-brand-navy font-outfit text-xl font-bold mb-4">Closest Stores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MALL_BRANCHES.map((mall) => (
                        <div
                            key={mall.id}
                            onClick={() => navigate(`/store/${mall.id}`)}
                            className={`bg-white rounded-2xl overflow-hidden border-b-4 ${mall.theme} shadow-md cursor-pointer transition-transform active:scale-95`}
                        >
                            <div className="relative h-48">
                                <img src={mall.image} alt={mall.brand} className="w-full h-full object-cover" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-navy">
                                    25 - 40 mins
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-outfit text-lg font-bold text-brand-navy">{mall.brand}</h3>
                                    <div className="text-green-600 text-xs font-bold">★ {mall.rating}</div>
                                </div>
                                <p className="text-gray-500 text-sm">{mall.branchName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Discovery;