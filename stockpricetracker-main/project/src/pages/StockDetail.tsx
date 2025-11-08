import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, TrendingUp, TrendingDown, BarChart3, DollarSign } from 'lucide-react';
import { useStock, Stock } from '../contexts/StockContext';
import StockChart from '../components/StockChart';
import RealTimePrice from '../components/RealTimePrice';

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { getStockDetails, addToWatchlist, removeFromWatchlist, isInWatchlist } = useStock();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockDetails = async () => {
      if (symbol) {
        const stockData = await getStockDetails(symbol);
        setStock(stockData);
      }
      setLoading(false);
    };

    fetchStockDetails();
  }, [symbol, getStockDetails]);

  const handleWatchlistToggle = () => {
    if (stock) {
      if (isInWatchlist(stock.symbol)) {
        removeFromWatchlist(stock.symbol);
      } else {
        addToWatchlist(stock);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-pink-200 rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-pink-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-64 bg-pink-200 rounded-2xl"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-pink-200 rounded-2xl"></div>
              <div className="h-32 bg-pink-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stock Not Found</h2>
          <p className="text-gray-600 mb-6">The stock you're looking for doesn't exist.</p>
          <Link
            to="/watchlist"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Watchlist
          </Link>
        </div>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link
          to="/watchlist"
          className="p-2 rounded-lg hover:bg-pink-50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{stock.name}</h1>
          <p className="text-gray-600">{stock.symbol}</p>
        </div>
        <button
          onClick={handleWatchlistToggle}
          className={`p-3 rounded-full transition-all duration-300 ${
            isInWatchlist(stock.symbol)
              ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              : 'bg-gray-100 text-gray-400 hover:bg-pink-50 hover:text-pink-600'
          }`}
        >
          <Heart className={`w-6 h-6 ${isInWatchlist(stock.symbol) ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Price Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-pink-200">
            <div className="mb-6">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ₹{stock.price.toLocaleString('en-IN')}
              </div>
              <div className={`flex items-center space-x-1 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-medium">
                  {isPositive ? '+' : ''}₹{stock.change.toFixed(2)}
                </span>
                <span>
                  ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            
            {/* Mock Chart Placeholder */}
            <StockChart isPositive={isPositive} basePrice={stock.price} />
          </div>

          {/* Key Stats */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-pink-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Key Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Volume</div>
                <div className="font-semibold text-gray-900">
                  {stock.volume ? stock.volume.toLocaleString('en-IN') : '1,23,456'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Market Cap</div>
                <div className="font-semibold text-gray-900">
                  {stock.marketCap || '₹2.5L Cr'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">P/E Ratio</div>
                <div className="font-semibold text-gray-900">
                  {stock.pe || '18.45'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Dividend Yield</div>
                <div className="font-semibold text-gray-900">2.15%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* 52 Week Range */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">52 Week Range</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>₹{stock.low52Week || (stock.price * 0.8).toFixed(2)}</span>
                  <span>₹{stock.high52Week || (stock.price * 1.2).toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Sector</span>
                <span className="font-medium text-gray-900">Technology</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Industry</span>
                <span className="font-medium text-gray-900">Software</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Employees</span>
                <span className="font-medium text-gray-900">50,000+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Founded</span>
                <span className="font-medium text-gray-900">1968</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={handleWatchlistToggle}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isInWatchlist(stock.symbol)
                    ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                    : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:shadow-lg'
                }`}
              >
                <Heart className={`w-4 h-4 ${isInWatchlist(stock.symbol) ? 'fill-current' : ''}`} />
                <span>
                  {isInWatchlist(stock.symbol) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-100 text-green-600 rounded-xl font-medium hover:bg-green-200 transition-colors">
                <DollarSign className="w-4 h-4" />
                <span>Buy Stock</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;