import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers (The "Brains" of the app)
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import Discovery from './pages/Discovery'; // We renamed Home to Discovery
import Storefront from './pages/Storefront';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import Login from './pages/Login';
import AddressManager from './pages/AddressManager';
import SearchPage from './pages/Search';

// Components
import CartConflictModal from './components/modals/CartConflictModal';

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
    <div className="max-w-screen-xl mx-auto flex justify-between items-center">
      <h1 className="text-brand-orange font-outfit text-2xl font-bold">ShopperPoint</h1>
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-brand-navy bg-gray-100 px-3 py-1 rounded-full">Lagos, NG</span>
        <div className="w-10 h-10 bg-brand-gray rounded-full flex items-center justify-center cursor-pointer">
          🛒
        </div>
      </div>
    </div>
  </nav>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-brand-gray">
            <Navbar />

            {/* Main Content Area */}
            <main className="max-w-screen-xl mx-auto bg-white min-h-[calc(100vh-64px)] shadow-sm relative">
              <Routes>
                {/* Discovery / Home */}
                <Route path="/" element={<Discovery />} />

                {/* Store & Products */}
                <Route path="/store/:storeId" element={<Storefront />} />
                <Route path="/search" element={<SearchPage />} />

                {/* Checkout & User Flow */}
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/addresses" element={<AddressManager />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Mobile Bottom Nav */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden flex justify-around py-3 z-40">
              <button className="flex flex-col items-center text-[10px] font-bold text-brand-orange">
                <span>🏠</span> Explore
              </button>
              <button className="flex flex-col items-center text-[10px] font-bold text-gray-400">
                <span>📦</span> Orders
              </button>
              <button className="flex flex-col items-center text-[10px] font-bold text-gray-400">
                <span>👤</span> Profile
              </button>
            </footer>

            {/* Global Modals */}
            <CartConflictModal />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;