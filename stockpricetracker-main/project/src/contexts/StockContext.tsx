import React, { createContext, useContext, useState, useEffect } from 'react';
import { stockApi, StockQuote } from '../services/stockApi';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: string;
  pe?: number;
  high52Week?: number;
  low52Week?: number;
}

interface StockContextType {
  watchlist: Stock[];
  addToWatchlist: (stock: Stock) => void;
  removeFromWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
  searchStocks: (query: string) => Promise<Stock[]>;
  getStockDetails: (symbol: string) => Promise<Stock | null>;
  indianStocks: Stock[];
  fetchRealTimeData: (symbol: string) => Promise<Stock | null>;
}

const StockContext = createContext<StockContextType | null>(null);

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};

// Mock Indian stocks data
const mockIndianStocks: Stock[] = [
  { symbol: 'RELIANCE.BSE', name: 'Reliance Industries Ltd', price: 2847.60, change: 45.20, changePercent: 1.61 },
  { symbol: 'TCS.BSE', name: 'Tata Consultancy Services', price: 4125.75, change: -32.15, changePercent: -0.77 },
  { symbol: 'HDFCBANK.BSE', name: 'HDFC Bank Ltd', price: 1678.90, change: 22.45, changePercent: 1.36 },
  { symbol: 'INFY.BSE', name: 'Infosys Ltd', price: 1845.30, change: 18.75, changePercent: 1.03 },
  { symbol: 'ICICIBANK.BSE', name: 'ICICI Bank Ltd', price: 1234.50, change: -15.20, changePercent: -1.22 },
  { symbol: 'HINDUNILVR.BSE', name: 'Hindustan Unilever Ltd', price: 2456.80, change: 28.90, changePercent: 1.19 },
  { symbol: 'LT.BSE', name: 'Larsen & Toubro Ltd', price: 3567.45, change: -42.30, changePercent: -1.17 },
  { symbol: 'SBIN.BSE', name: 'State Bank of India', price: 789.25, change: 12.35, changePercent: 1.59 },
  { symbol: 'BHARTIARTL.BSE', name: 'Bharti Airtel Ltd', price: 1456.70, change: 23.80, changePercent: 1.66 },
  { symbol: 'ASIANPAINT.BSE', name: 'Asian Paints Ltd', price: 3234.90, change: -18.45, changePercent: -0.57 }
];

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [indianStocks] = useState<Stock[]>(mockIndianStocks);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  const addToWatchlist = (stock: Stock) => {
    const newWatchlist = [...watchlist, stock];
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (symbol: string) => {
    const newWatchlist = watchlist.filter(stock => stock.symbol !== symbol);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const isInWatchlist = (symbol: string) => {
    return watchlist.some(stock => stock.symbol === symbol);
  };

  const searchStocks = async (query: string): Promise<Stock[]> => {
    try {
      const results = await stockApi.searchStocks(query);
      
      // Convert search results to Stock format with mock prices
      const stockResults = results.map(result => {
        const mockStock = indianStocks.find(stock => 
          stock.symbol.includes(result.symbol) || 
          stock.name.toLowerCase().includes(result.name.toLowerCase())
        );
        
        return mockStock || {
          symbol: result.symbol,
          name: result.name,
          price: Math.random() * 3000 + 1000, // Random price between 1000-4000
          change: (Math.random() - 0.5) * 100,
          changePercent: (Math.random() - 0.5) * 5
        };
      });
      
      return stockResults;
    } catch (error) {
      console.error('Error searching stocks:', error);
      // Fallback to mock search
      return indianStocks.filter(stock => 
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const getStockDetails = async (symbol: string): Promise<Stock | null> => {
    // Mock stock details
    return indianStocks.find(stock => stock.symbol === symbol) || null;
  };

  const fetchRealTimeData = async (symbol: string): Promise<Stock | null> => {
    try {
      const stockData = await stockApi.getStockQuote(symbol);
      return {
        symbol: stockData.symbol,
        name: stockData.name,
        price: stockData.price,
        change: stockData.change,
        changePercent: stockData.changePercent,
        volume: stockData.volume,
        marketCap: stockData.marketCap,
        pe: stockData.pe,
        high52Week: stockData.high52Week,
        low52Week: stockData.low52Week
      };
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      // Fallback to mock data
      return getStockDetails(symbol);
    }
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    searchStocks,
    getStockDetails,
    indianStocks,
    fetchRealTimeData
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};