import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export function useLocationContext() {
    return useContext(LocationContext);
}

const DEFAULT_LOCATIONS = [
    'Lagos, NG',
    'Abuja, NG',
    'Port Harcourt, NG',
    'Ibadan, NG',
    'Enugu, NG',
];

export function LocationProvider({ children }) {
    const [location, setLocation] = useState('Lagos, NG');
    const [showSelector, setShowSelector] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('user_location');
        if (saved) setLocation(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('user_location', location);
    }, [location]);

    return (
        <LocationContext.Provider value={{ location, setLocation, showSelector, setShowSelector, locations: DEFAULT_LOCATIONS }}>
            {children}
        </LocationContext.Provider>
    );
}
