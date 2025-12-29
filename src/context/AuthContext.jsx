import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    // Persistent user authentication
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('sp_user');
        if (saved) return JSON.parse(saved);
        return {
            id: 'user_01',
            email: 'shopper@lagos.ng',
            full_name: 'Customer Chief'
        };
    });


    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('sp_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('sp_user');
        }
    }, [user]);

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