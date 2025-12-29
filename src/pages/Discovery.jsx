import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { MALL_BRANCHES } from '../utils/mockData';

const MOCK_STORES = [
    {
        id: 'j-1',
        brand: 'Jendol',
        branchName: 'Abule Egba',
        locationTag: 'Ikorodu',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80',
        theme: 'border-purple-600',
    },
    {
        id: 'jr-1',
        brand: 'Justrite',
        branchName: 'Ikeja City Mall',
        locationTag: 'Ikeja',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80',
        theme: 'border-red-500',
    },
    {
        id: 'sr-1',
        brand: 'Shoprite',
        branchName: 'Circle Mall, Lekki',
        locationTag: 'Ikorodu',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
        theme: 'border-red-700',
    },
];

const Discovery = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState('Ikorodu');
    const routerLocation = useLocation();

    // Sort stores by proximity
    const nearbyStores = MOCK_STORES.filter(store => store.locationTag === location);
    const otherStores = MOCK_STORES.filter(store => store.locationTag !== location);

    return (
        <div className="pb-24 sm:pb-20">
            {routerLocation.pathname !== '/search' && (
                <AppBar location={location} setLocation={setLocation} />
            )}
            {/* Nearby Malls */}
            {nearbyStores.length > 0 && (
                <section className="mt-8 px-2 sm:px-4">
                    <h2 className="text-brand-navy font-outfit text-xl font-bold mb-4">Nearby Malls</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {nearbyStores.map((mall) => (
                            <div
                                key={mall.id}
                                onClick={() => navigate(`/store/${mall.id}`)}
                                className={`bg-white rounded-2xl overflow-hidden border-b-4 ${mall.theme} shadow-md cursor-pointer transition-transform active:scale-95 relative`}
                            >
                                {/* Fastest Delivery Badge */}
                                <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">Fastest Delivery</span>
                                <div className="relative h-40 sm:h-48">
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
            )}

            {/* Other Malls */}
            {otherStores.length > 0 && (
                <section className="mt-8 px-2 sm:px-4">
                    <h2 className="text-brand-navy font-outfit text-xl font-bold mb-4">Explore Other Malls</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {otherStores.map((mall) => (
                            <div
                                key={mall.id}
                                onClick={() => navigate(`/store/${mall.id}`)}
                                className={`bg-white rounded-2xl overflow-hidden border-b-4 ${mall.theme} shadow-md cursor-pointer transition-transform active:scale-95`}
                            >
                                <div className="relative h-40 sm:h-48">
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
            )}
        </div>
    );
};

export default Discovery;