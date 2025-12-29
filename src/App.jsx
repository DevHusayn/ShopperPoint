import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome, faBoxOpen, faUser, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers (The "Brains" of the app)
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { LocationProvider, useLocationContext } from './context/LocationContext';

// Pages
import Discovery from './pages/Discovery'; // We renamed Home to Discovery
import Storefront from './pages/Storefront';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import Login from './pages/Login';
import AddressManager from './pages/AddressManager';
import SearchPage from './pages/Search';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

// Components
import CartConflictModal from './components/modals/CartConflictModal';

import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const { cartCount } = useCart();
  const { location, setShowSelector } = useLocationContext();
  const routerLocation = useRouterLocation();
  const navigate = useNavigate();
  // Pages that should show only a simple header
  const simpleHeaderRoutes = ['/tracking', '/login', '/addresses', '/orders', '/profile'];
  const titles = {
    '/tracking': 'Track Order',
    '/login': 'Login',
    '/addresses': 'Addresses',
    '/orders': 'My Orders',
    '/profile': 'Profile',
  };
  if (simpleHeaderRoutes.includes(routerLocation.pathname)) {
    return (
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <FontAwesomeIcon icon={faChevronLeft} className="text-brand-navy" />
          </button>
          <h1 className="font-outfit font-bold text-brand-navy text-lg flex-1 text-center">{titles[routerLocation.pathname]}</h1>
        </div>
      </nav>
    );
  }
  // Default: full navbar
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-brand-orange font-outfit text-2xl font-bold">ShopperPoint</h1>
        <div className="flex items-center gap-4">
          <button
            className="text-xs font-bold text-brand-navy bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
            onClick={() => setShowSelector(true)}
          >{location}</button>
          <div className="relative w-10 h-10 bg-brand-gray rounded-full flex items-center justify-center cursor-pointer" onClick={() => window.location.pathname = '/checkout'}>
            <FontAwesomeIcon icon={faShoppingCart} size="lg" className="text-brand-orange" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <LocationProvider>
            <Router>
              <AppContent />
            </Router>
          </LocationProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

import { useLocation } from 'react-router-dom';
function AppContent() {
  const location = useLocation();
  const { showSelector, setShowSelector, locations, setLocation } = useLocationContext();
  const hideNavbarRoutes = ['/checkout'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  return (
    <div className="min-h-screen bg-brand-gray">
      {showNavbar && <Navbar />}
      {/* Location Selector Modal */}
      {showSelector && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full text-center border border-brand-orange">
            <h2 className="text-lg font-bold text-brand-navy mb-4">Select Your Location</h2>
            <div className="space-y-2 mb-4">
              {locations.map(loc => (
                <button
                  key={loc}
                  className="w-full py-2 rounded-xl font-bold text-brand-navy bg-gray-100 hover:bg-brand-orange hover:text-white transition mb-2"
                  onClick={() => {
                    setLocation(loc);
                    setShowSelector(false);
                  }}
                >{loc}</button>
              ))}
            </div>
            <button className="mt-2 text-xs text-gray-400 underline" onClick={() => setShowSelector(false)}>Cancel</button>
          </div>
        </div>
      )}
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/addresses" element={<AddressManager />} />
          <Route path="/orders" element={<Orders />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* Mobile Bottom Nav */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden flex justify-around py-3 z-40">
        <button className={`flex flex-col items-center text-[12px] font-bold ${location.pathname === '/' ? 'text-brand-orange' : 'text-gray-400'}`} style={{ minWidth: 60 }} onClick={() => window.location.pathname = '/'}>
          <FontAwesomeIcon icon={faHome} size="lg" className="mb-1" /> Explore
        </button>
        <button className={`flex flex-col items-center text-[12px] font-bold ${location.pathname === '/orders' ? 'text-brand-orange' : 'text-gray-400'}`} style={{ minWidth: 60 }} onClick={() => window.location.pathname = '/orders'}>
          <FontAwesomeIcon icon={faBoxOpen} size="lg" className="mb-1" /> Orders
        </button>
        <button className={`flex flex-col items-center text-[12px] font-bold ${location.pathname === '/profile' ? 'text-brand-orange' : 'text-gray-400'}`} style={{ minWidth: 60 }} onClick={() => window.location.pathname = '/profile'}>
          <FontAwesomeIcon icon={faUser} size="lg" className="mb-1" /> Profile
        </button>
      </footer>
      {/* Global Modals */}
      <CartConflictModal />
    </div>
  );
}

export default App;