import React from 'react';
import { TrendingUp, TrendingDown, Plus, Eye } from 'lucide-react';
import { useStock } from '../contexts/StockContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import StockCard from '../components/StockCard';
import StockChart from '../components/StockChart';
import ApiKeySetup from '../components/ApiKeySetup';

const Dashboard = () => {
  const { user } = useAuth();
  const { watchlist, indianStocks } = useStock();
  const [showApiSetup, setShowApiSetup] = React.useState(false);

  const portfolioValue = watchlist.reduce((total, stock) => total + stock.price, 0);
  const gainers = indianStocks.filter(stock => stock.change > 0).slice(0, 5);
  const losers = indianStocks.filter(stock => stock.change < 0).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Here's what's happening with your investments today.
          </p>
          <button
            onClick={() => setShowApiSetup(!showApiSetup)}
            className="text-sm bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Setup Real-time Data
          </button>
        </div>
      </div>

      {/* API Key Setup Modal */}
      {showApiSetup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative">
            <button
              onClick={() => setShowApiSetup(false)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              ✕
            </button>
            <ApiKeySetup />
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Portfolio Value</h3>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            ₹{portfolioValue.toLocaleString('en-IN')}
          </div>
          <div className="text-sm text-green-600">+₹2,340 today</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Watchlist</h3>
            <Eye className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{watchlist.length}</div>
          <div className="text-sm text-blue-600">stocks tracked</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Today's Change</h3>
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">+1.25%</div>
          <div className="text-sm text-purple-600">overall gain</div>
        </div>
      </div>

      {/* Portfolio Performance Chart */}
      <div className="mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-pink-500 mr-2" />
            Portfolio Performance 📈
          </h2>
          <StockChart isPositive={true} />
        </div>
      </div>

      {/* My Watchlist */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Watchlist 💕</h2>
          <Link
            to="/watchlist"
            className="flex items-center space-x-2 text-pink-500 hover:text-pink-600 font-medium"
          >
            <span>View All</span>
            <Plus className="w-4 h-4" />
          </Link>
        </div>
        
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.slice(0, 6).map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 text-center border border-pink-200">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <StockChart isPositive={true} basePrice={portfolioValue / watchlist.length || 2500} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Building Your Watchlist</h3>
            <p className="text-gray-600 mb-6">
              Add your favorite Indian stocks to track their performance and stay updated.
            </p>
            <Link
              to="/watchlist"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
            >
              Browse Stocks
            </Link>
          </div>
        )}
      </div>

      {/* Market Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Gainers */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
            Top Gainers 📈
          </h2>
          <div className="space-y-4">
            {gainers.map((stock) => (
              <div
                key={stock.symbol}
                className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{stock.symbol}</h3>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₹{stock.price.toLocaleString('en-IN')}</div>
                    <div className="text-green-600 text-sm font-medium">
                      +{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingDown className="w-6 h-6 text-red-500 mr-2" />
            Top Losers 📉
          </h2>
          <div className="space-y-4">
            {losers.map((stock) => (
              <div
                key={stock.symbol}
                className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-red-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{stock.symbol}</h3>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₹{stock.price.toLocaleString('en-IN')}</div>
                    <div className="text-red-600 text-sm font-medium">
                      {stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;