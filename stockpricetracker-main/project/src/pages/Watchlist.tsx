import React, { useState } from 'react';
import { Search, Plus, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { useStock } from '../contexts/StockContext';
import StockCard from '../components/StockCard';

const Watchlist = () => {
  const { watchlist, indianStocks, searchStocks } = useStock();
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

  const popularStocks = indianStocks.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Watchlist 💕
        </h1>
        <p className="text-gray-600">
          Track your favorite Indian stocks and discover new investment opportunities.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for Indian stocks..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>
        
        {/* Search Results */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-pink-100 max-h-60 overflow-y-auto z-50">
            {searchResults.map((stock) => (
              <div
                key={stock.symbol}
                className="p-4 hover:bg-pink-50 border-b border-pink-50 last:border-b-0 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{stock.name}</div>
                    <div className="text-sm text-gray-500">{stock.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₹{stock.price.toLocaleString('en-IN')}</div>
                    <div className={`text-sm font-medium ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Watchlist Section */}
      {watchlist.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart className="w-6 h-6 text-pink-500 mr-2" />
            My Stocks ({watchlist.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      )}

      {/* Popular Stocks Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 text-purple-500 mr-2" />
          Popular Indian Stocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>

      {/* All Stocks Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Plus className="w-6 h-6 text-indigo-500 mr-2" />
          Discover More Stocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indianStocks.slice(6).map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {watchlist.length === 0 && !showSearchResults && (
        <div className="text-center py-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-pink-200">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Your Watchlist is Empty
            </h3>
            <p className="text-gray-600 mb-6">
              Start by searching for Indian stocks above or browse our popular picks below.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;