import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const BRAND_COLOR = '#FF4F00';
const LOCATION_OPTIONS = [
    { tag: 'Ikorodu', label: 'MG37+2JX, Ikorodu...' },
    { tag: 'Ikeja', label: 'WJ46+2JX, Ikeja...' }
];

export default function AppBar({ location, setLocation }) {
    const currentLocation = LOCATION_OPTIONS.find(l => l.tag === location) || { tag: location, label: location };
    const [dropdown, setDropdown] = useState(false);
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(location || '');

    const handleInputBlur = () => {
        setEditing(false);
        if (inputValue.trim()) setLocation(inputValue.trim());
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Branding */}
                <span className="font-outfit font-bold text-2xl" style={{ color: BRAND_COLOR }}>
                    ShopperPoint
                </span>
                {/* Location Selector */}
                <div className="relative">
                    <button
                        className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full font-semibold text-brand-navy hover:bg-gray-200 transition"
                        onClick={() => setDropdown(d => !d)}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600" />
                        {editing ? (
                            <input
                                className="bg-transparent border-b border-brand-orange outline-none w-32 text-sm px-1"
                                value={inputValue}
                                autoFocus
                                onChange={e => setInputValue(e.target.value)}
                                onBlur={handleInputBlur}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') handleInputBlur();
                                }}
                            />
                        ) : (
                            <span onClick={() => setEditing(true)} title="Edit location" className="cursor-text">
                                {currentLocation.label}
                            </span>
                        )}
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
                    </button>
                    {dropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                            {LOCATION_OPTIONS.map(opt => (
                                <button
                                    key={opt.tag}
                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-brand-orange hover:text-white rounded-xl ${opt.tag === location ? 'bg-brand-orange text-white' : 'text-brand-navy'}`}
                                    onClick={() => {
                                        setLocation(opt.tag);
                                        setInputValue(opt.tag);
                                        setDropdown(false);
                                    }}
                                >{opt.label}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
