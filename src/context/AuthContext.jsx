import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // We initialize with a mock user for development
    const [user, setUser] = useState({
        id: 'user_01',
        email: 'shopper@lagos.ng',
        full_name: 'Customer Chief'
    });

    const [loading, setLoading] = useState(false);

    // Mock functions for now
    const signIn = async () => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => setLoading(false), 1000);
    };

    const signOut = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);