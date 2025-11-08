import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useStock } from '../contexts/StockContext';

interface RealTimePriceProps {
  symbol: string;
  className?: string;
}

const RealTimePrice: React.FC<RealTimePriceProps> = ({ symbol, className = '' }) => {
  const { fetchRealTimeData } = useStock();
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchRealTimeData(symbol);
      if (data) {
        setStockData(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching real-time data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, [symbol]);

  if (!stockData) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-pink-200 rounded w-32 mb-2"></div>
        <div className="h-4 bg-pink-200 rounded w-20"></div>
      </div>
    );
  }

  const isPositive = stockData.change >= 0;

  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-2xl font-bold text-gray-900">
          ₹{stockData.price.toLocaleString('en-IN')}
        </span>
        <button
          onClick={fetchData}
          disabled={loading}
          className="p-1 rounded-full hover:bg-pink-100 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-pink-500 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className={`flex items-center space-x-1 ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="font-medium">
          {isPositive ? '+' : ''}₹{stockData.change.toFixed(2)}
        </span>
        <span>
          ({isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
        </span>
      </div>
      
      {lastUpdated && (
        <div className="text-xs text-gray-500 mt-1">
          Updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default RealTimePrice;