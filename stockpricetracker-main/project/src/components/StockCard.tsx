import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { useStock, Stock } from '../contexts/StockContext';

interface StockCardProps {
  stock: Stock;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useStock();

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist(stock.symbol)) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock);
    }
  };

  const isPositive = stock.change >= 0;
  const inWatchlist = isInWatchlist(stock.symbol);

  return (
    <Link to={`/stock/${stock.symbol}`}>
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-pink-600 transition-colors">
              {stock.symbol.replace('.BSE', '')}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{stock.name}</p>
          </div>
          <button
            onClick={handleWatchlistToggle}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              inWatchlist
                ? 'bg-pink-100 text-pink-600'
                : 'bg-gray-100 text-gray-400 hover:bg-pink-50 hover:text-pink-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWatchlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ₹{stock.price.toLocaleString('en-IN')}
          </div>
          <div className={`flex items-center space-x-1 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}₹{stock.change.toFixed(2)}
            </span>
            <span className="text-sm">
              ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className={`h-1 rounded-full transition-all duration-500 ${
              isPositive ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'
            }`}
            style={{ width: `${Math.min(Math.abs(stock.changePercent) * 10, 100)}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default StockCard;