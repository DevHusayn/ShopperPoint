import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome, faShoppingBag, faUser, faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers (The "Brains" of the app)
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { LocationProvider, useLocationContext } from './context/LocationContext';

// Pages
const Discovery = React.lazy(() => import('./pages/Discovery'));
const Storefront = React.lazy(() => import('./pages/Storefront'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Tracking = React.lazy(() => import('./pages/Tracking'));
const Login = React.lazy(() => import('./pages/Login'));
const AddressManager = React.lazy(() => import('./pages/AddressManager'));
const SearchPage = React.lazy(() => import('./pages/Search'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Profile = React.lazy(() => import('./pages/Profile'));
const AddressMapPicker = React.lazy(() => import('./pages/AddressMapPicker'));

// Components
import CartConflictModal from './components/modals/CartConflictModal';

import { useLocation, useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const { cartCount } = useCart();
  const { location, setLocation, locations } = useLocationContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const routerLocation = useRouterLocation();
  // Pages that should show only a simple header
  const mainPages = ['/', '/search', '/orders', '/profile'];
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
          {/* Only show back arrow if not on a main page */}
          {!mainPages.includes(routerLocation.pathname) && (
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <FontAwesomeIcon icon={faChevronLeft} className="text-brand-navy" />
            </button>
          )}
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
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 text-xs font-bold text-brand-navy bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition min-w-[120px]"
              onClick={() => setDropdownOpen((open) => !open)}
              type="button"
            >
              <span>{location || 'Delivery Address'}</span>
              <span className="ml-1 text-gray-400">▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                {locations.map(loc => (
                  <button
                    key={loc}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-brand-orange hover:text-white rounded-xl ${loc === location ? 'bg-brand-orange text-white' : 'text-brand-navy'}`}
                    onClick={() => {
                      setLocation(loc);
                      setDropdownOpen(false);
                    }}
                  >{loc}</button>
                ))}
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-brand-navy hover:bg-blue-100 rounded-xl border-t border-gray-100"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/map-picker');
                  }}
                >
                  <span role="img" aria-label="map">🗺️</span> Select on Map
                </button>
              </div>
            )}
          </div>
          <div className="relative w-10 h-10 bg-brand-gray rounded-full flex items-center justify-center cursor-pointer" onClick={() => navigate('/checkout')}>
            <FontAwesomeIcon icon={faShoppingCart} size="lg" className="text-brand-orange" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
// Bottom nav buttons as a separate component to use navigate
function NavFooterButtons({ location }) {
  const navigate = useNavigate();
  return (
    <>
      <button className={`flex flex-col items-center text-[12px] font-bold ${location.pathname === '/' ? 'text-brand-orange' : 'text-gray-400'}`} style={{ minWidth: 60 }} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faHome} size="lg" className={`mb-1 ${location.pathname === '/' ? 'text-brand-orange' : 'text-gray-400'}`} /> Home
      </button>
      <button className={`flex flex-col items-center text-[12px] font-bold ${location.pathname === '/search' ? 'text-brand-orange' : 'text-gray-400'}`} style={{ minWidth: 60 }} onClick={() => navigate('/search')}>
        <FontAwesomeIcon icon={faSearch} size="lg" className={`mb-1 ${location.pathname === '/search' ? 'text-brand-orange' : 'text-gray-400'}`} /> Search
      </button>
      <button className={`flex flex-col items-center text-[12px] font-bold ${location.pathname === '/orders' ? 'text-brand-orange' : 'text-gray-400'}`} style={{ minWidth: 60 }} onClick={() => navigate('/orders')}>
        <FontAwesomeIcon icon={faShoppingBag} size="lg" className={`mb-1 ${location.pathname === '/orders' ? 'text-brand-orange' : 'text-gray-400'}`} /> Orders
      </button>
      <button className={`flex flex-col items-center text-[12px] font-bold ${location.pathname === '/profile' ? 'text-brand-orange' : 'text-gray-400'}`} style={{ minWidth: 60 }} onClick={() => navigate('/profile')}>
        <FontAwesomeIcon icon={faUser} size="lg" className={`mb-1 ${location.pathname === '/profile' ? 'text-brand-orange' : 'text-gray-400'}`} /> Profile
      </button>
    </>
  );
}




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

function AppContent() {
  const location = useLocation();
  const { showSelector, setShowSelector, locations, setLocation } = useLocationContext();
  const hideNavbarRoutes = ['/checkout', '/', '/search', '/tracking', '/addresses'];
  // Hide Navbar on all /store/* routes (wildcard match)
  const isStorefront = location.pathname.startsWith('/store/');
  const showNavbar = !hideNavbarRoutes.includes(location.pathname) && !isStorefront;
  return (
    <div className="min-h-screen bg-brand-gray flex flex-col">
      {showNavbar && <Navbar />}
      {/* Location Selector Modal */}
      {showSelector && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 px-2 sm:px-0">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 max-w-xs w-full text-center border border-brand-orange">
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
      {/* Main Content Area with Suspense for code splitting */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto bg-white min-h-[calc(100vh-64px)] shadow-sm relative px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16">
        <React.Suspense fallback={
          <div className="w-full h-full flex flex-col gap-4 animate-pulse p-4">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-2" />
            <div className="h-6 w-2/3 bg-gray-100 rounded mb-2" />
            <div className="h-40 w-full bg-gray-100 rounded mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
        }>
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
            <Route path="/map-picker" element={<AddressMapPicker onSelect={(coords) => { setLocation(`Lat ${coords.lat}, Lng ${coords.lng}`); navigate(-1); }} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </main>
      {/* Mobile Bottom Nav: Only show on main tab pages */}
      {['/', '/search', '/orders', '/profile'].includes(location.pathname) && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-40">
          <NavFooterButtons location={location} />
        </footer>
      )}
      {/* Global Modals */}
      <CartConflictModal />
    </div>
  );

};
export default App;