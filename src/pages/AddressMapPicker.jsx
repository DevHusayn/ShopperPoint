import React, { useState } from 'react';
// For demonstration, we use a static map image. Replace with a real map (e.g., Google Maps, Mapbox, Leaflet) for production.


function getStaticMapUrl(lat, lng) {
    // Replace with your real API key and logic for production
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x300&markers=color:red%7C${lat},${lng}&key=YOUR_API_KEY`;
}

export default function AddressMapPicker({ onSelect, initialCoords }) {
    // Replace with real map logic for production
    const [coords, setCoords] = useState(initialCoords || { lat: 6.5244, lng: 3.3792 });
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Simulate geocoding: In production, call a real geocoding API
    const geocodeAddress = async (addr) => {
        setLoading(true);
        setError('');
        // Simulate: Lagos, NG → 6.5244, 3.3792; Abuja, NG → 9.0579, 7.4951
        await new Promise((res) => setTimeout(res, 800));
        if (/lagos/i.test(addr)) setCoords({ lat: 6.5244, lng: 3.3792 });
        else if (/abuja/i.test(addr)) setCoords({ lat: 9.0579, lng: 7.4951 });
        else if (/port harcourt/i.test(addr)) setCoords({ lat: 4.8156, lng: 7.0498 });
        else if (/ibadan/i.test(addr)) setCoords({ lat: 7.3775, lng: 3.947 });
        else if (/enugu/i.test(addr)) setCoords({ lat: 6.5246, lng: 7.5086 });
        else setError('Address not found. Try a major city in Nigeria.');
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-lg font-bold mb-4">Select Delivery Location</h2>
            <input
                type="text"
                className="mb-4 px-4 py-2 border rounded-xl w-[350px] max-w-full text-sm"
                placeholder="Type your address (e.g. Lagos, NG)"
                value={address}
                onChange={e => setAddress(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') geocodeAddress(address); }}
                disabled={loading}
            />
            <button
                className="mb-4 bg-brand-orange text-white px-4 py-2 rounded-xl font-bold"
                onClick={() => geocodeAddress(address)}
                disabled={loading}
            >
                {loading ? 'Locating...' : 'Find on Map'}
            </button>
            {error && <div className="mb-4 text-red-500 text-xs">{error}</div>}
            <div className="border rounded-xl overflow-hidden mb-4">
                <img src={getStaticMapUrl(coords.lat, coords.lng)} alt="Map" className="w-[400px] h-[300px] object-cover" />
            </div>
            <div className="mb-4 text-sm text-gray-600">
                Selected: Lat {coords.lat}, Lng {coords.lng}
            </div>
            <button
                className="bg-brand-orange text-white px-6 py-2 rounded-xl font-bold"
                onClick={() => onSelect && onSelect(coords)}
            >
                Use This Location
            </button>
        </div>
    );
}
