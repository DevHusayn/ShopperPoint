import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin,
    Navigation,
    Plus,
    Trash2,
    Home,
    Briefcase,
    Map as MapIcon,
    ChevronLeft,
    Check
} from 'lucide-react';
import { useCart } from '../context/CartContext'; // Note: Addresses can be managed via Cart or Auth context

const AddressManager = () => {
    const navigate = useNavigate();
    // Using a local mock state here, but in production, this connects to your CartContext/Supabase
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            nickname: 'Home',
            street: '12 Admiralty Way',
            area: 'Lekki Phase 1, Lagos',
            landmark: 'Opposite Kilimanjaro Chicken',
            selected: true
        }
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [locating, setLocating] = useState(false);

    const [formData, setFormData] = useState({
        nickname: 'Home',
        street: '',
        area: '',
        landmark: ''
    });

    const handleSimulateGPS = () => {
        setLocating(true);
        setTimeout(() => {
            setFormData({
                ...formData,
                street: 'Ikeja City Mall',
                area: 'Obafemi Awolowo Way, Ikeja'
            });
            setLocating(false);
        }, 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAddr = { ...formData, id: Date.now(), selected: false };
        setAddresses([...addresses, newAddr]);
        setIsAdding(false);
        setFormData({ nickname: 'Home', street: '', area: '', landmark: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white p-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
                <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="text-brand-navy" />
                </button>
                <h1 className="font-outfit font-bold text-brand-navy">My Addresses</h1>
            </header>

            <main className="p-4 max-w-xl mx-auto space-y-4">
                {!isAdding ? (
                    <>
                        {/* Address List */}
                        <div className="space-y-3">
                            {addresses.map(addr => (
                                <div
                                    key={addr.id}
                                    className={`bg-white p-4 rounded-2xl shadow-sm border-2 transition-all ${addr.selected ? 'border-brand-orange' : 'border-transparent'
                                        } flex justify-between items-start`}
                                >
                                    <div className="flex gap-4">
                                        <div className="bg-orange-50 p-3 rounded-xl h-fit text-brand-orange">
                                            {addr.nickname === 'Home' ? <Home size={20} /> : <Briefcase size={20} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-brand-navy">{addr.nickname}</span>
                                                {addr.selected && (
                                                    <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 leading-tight mb-2">{addr.street}, {addr.area}</p>

                                            {/* Landmark Badge - Critical for Logistics */}
                                            <div className="inline-flex items-center gap-2 bg-brand-navy text-white px-3 py-1.5 rounded-lg">
                                                <MapIcon size={12} className="text-brand-orange" />
                                                <span className="text-[10px] font-bold">Landmark: {addr.landmark}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-gray-300 hover:text-red-500 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full py-5 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 font-bold hover:border-brand-orange hover:text-brand-orange transition-all"
                        >
                            <Plus size={20} /> Add New Address
                        </button>
                    </>
                ) : (
                    /* Address Entry Form */
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2rem] shadow-xl space-y-5 animate-slide-up">
                        <div className="text-center mb-2">
                            <h2 className="font-outfit font-bold text-xl text-brand-navy">Add Address</h2>
                            <p className="text-xs text-gray-400">Where are we delivering to?</p>
                        </div>

                        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                            {['Home', 'Office', 'Other'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, nickname: type })}
                                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${formData.nickname === type ? 'bg-white shadow-sm text-brand-orange' : 'text-gray-400'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleSimulateGPS}
                            disabled={locating}
                            className="w-full bg-brand-orange/10 text-brand-orange py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold border border-brand-orange/20 active:scale-95 transition-all"
                        >
                            <Navigation size={18} className={locating ? "animate-spin" : ""} />
                            {locating ? "Fetching GPS..." : "Use Current Location"}
                        </button>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Street Address</label>
                                <input
                                    placeholder="e.g. 10 Hughes Avenue"
                                    className="w-full bg-gray-50 p-4 rounded-xl text-sm border-none focus:ring-2 focus:ring-brand-orange/20 outline-none"
                                    required
                                    value={formData.street}
                                    onChange={e => setFormData({ ...formData, street: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Area / City</label>
                                <input
                                    placeholder="e.g. Alausa, Ikeja"
                                    className="w-full bg-gray-50 p-4 rounded-xl text-sm border-none focus:ring-2 focus:ring-brand-orange/20 outline-none"
                                    required
                                    value={formData.area}
                                    onChange={e => setFormData({ ...formData, area: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-brand-orange uppercase ml-1">Closest Landmark (Important)</label>
                                <div className="relative">
                                    <input
                                        placeholder="e.g. Next to Oando Filling Station"
                                        className="w-full bg-orange-50/50 p-4 pl-12 rounded-xl text-sm border-2 border-orange-100 focus:border-brand-orange outline-none font-medium"
                                        required
                                        onChange={e => setFormData({ ...formData, landmark: e.target.value })}
                                    />
                                    <MapIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-orange" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="flex-1 py-4 font-bold text-gray-400 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] bg-brand-navy text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
                            >
                                Save Address
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default AddressManager;