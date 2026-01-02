
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MALL_BRANCHES } from '../utils/mockData';
import AppBar from '../components/AppBar';
import { useLocationContext } from '../context/LocationContext';


export default function Discovery() {
    const navigate = useNavigate();
    const { location, setLocation } = useLocationContext();

    return (
        <div className="pb-24 sm:pb-20">
            <AppBar location={location} setLocation={setLocation} />
            <section className="mt-8 px-2 sm:px-4">
                <h2 className="text-brand-navy font-outfit text-xl font-bold mb-4">Nearby Malls</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {MALL_BRANCHES.map((mall) => (
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
        </div>
    );
}