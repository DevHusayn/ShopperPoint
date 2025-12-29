import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight, faEye, faEyeSlash, faCheckCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth(); // Using the mock sign-in from our context

    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Auth Processing
        setTimeout(() => {
            signIn(); // Update global auth state
            setLoading(false);
            navigate('/'); // Take user to Discovery page
        }, 1500);
    };

    return (
        <div className="min-h-[90vh] bg-white flex flex-col px-6 pt-12 pb-10">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-100">
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" className="text-brand-orange" />
                </div>
                <h1 className="text-3xl font-outfit font-black text-brand-navy">
                    ShopperPoint
                </h1>
                <p className="text-gray-500 mt-2 font-medium">
                    {isSignUp ? "Join the neighborhood kings" : "Welcome back, Chief!"}
                </p>
            </div>

            <div className="max-w-md w-full mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                placeholder="e.g. name@email.com"
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-orange/20 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all text-sm"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size="lg" />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-orange/20 focus:bg-white p-4 pl-12 pr-12 rounded-2xl outline-none transition-all text-sm"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size="lg" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} size="lg" /> : <FontAwesomeIcon icon={faEye} size="lg" />}
                            </button>
                        </div>
                    </div>

                    {!isSignUp && (
                        <div className="text-right">
                            <button type="button" className="text-xs font-bold text-brand-orange">Forgot Password?</button>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-navy text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-900/10 active:scale-95 transition-all mt-4"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                                <FontAwesomeIcon icon={faArrowRight} size="lg" />
                            </>
                        )}
                    </button>
                </form>

                {/* Toggle between Login/Signup */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        {isSignUp ? "Already have an account?" : "New to ShopperPoint?"}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="ml-2 font-black text-brand-orange underline"
                        >
                            {isSignUp ? "Sign In" : "Register Now"}
                        </button>
                    </p>
                </div>

                {/* Value Propositions (Trust Signals) */}
                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                        <FontAwesomeIcon icon={faCheckCircle} size="lg" className="text-green-500" />
                        <span className="text-[10px] font-bold text-gray-600">Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                        <FontAwesomeIcon icon={faCheckCircle} size="lg" className="text-green-500" />
                        <span className="text-[10px] font-bold text-gray-600">Secure Payment</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;