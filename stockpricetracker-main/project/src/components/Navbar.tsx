import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, BarChart3, Search, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStock } from '../contexts/StockContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { searchStocks } = useStock();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const results = await searchStocks(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleStockSelect = (symbol: string) => {
    navigate(`/stock/${symbol}`);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-2 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              StockBlossom
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          {user && (
            <div className="hidden md:block relative flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Indian stocks..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-pink-50 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm"
                />
              </div>
              
              {/* Search Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-pink-100 max-h-60 overflow-y-auto z-50">
                  {searchResults.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => handleStockSelect(stock.symbol)}
                      className="w-full text-left px-4 py-3 hover:bg-pink-50 border-b border-pink-50 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{stock.name}</div>
                      <div className="text-sm text-gray-500">{stock.symbol}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navigation Links - Desktop */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/watchlist"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/watchlist')
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Watchlist</span>
              </Link>
            </div>
          )}

          {/* User Menu - Desktop */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={signOut}
                className="p-2 text-gray-400 hover:text-pink-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/auth"
                className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-pink-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-pink-100">
            {user && (
              <>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search Indian stocks..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-pink-50 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/watchlist"
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive('/watchlist')
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  <span>Watchlist</span>
                </Link>
                <div className="flex items-center justify-between px-4 py-3 border-t border-pink-100 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="p-2 text-gray-400 hover:text-pink-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
            {!user && (
              <Link
                to="/auth"
                className="block bg-gradient-to-r from-pink-400 to-purple-500 text-white text-center px-6 py-3 rounded-full mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;