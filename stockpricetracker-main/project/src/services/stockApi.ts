// TwelveData API service for real-time stock data
const TWELVE_DATA_BASE_URL = 'https://api.twelvedata.com';

// For demo purposes, we'll use a mock API key
// In production, this should come from environment variables
const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY || 'demo';

export interface StockQuote {
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

export interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
  country: string;
  type: string;
}

class StockApiService {
  private async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${TWELVE_DATA_BASE_URL}/${endpoint}`);
    url.searchParams.append('apikey', API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'API error');
      }
      
      return data;
    } catch (error) {
      console.error('TwelveData API Error:', error);
      throw error;
    }
  }

  async getStockQuote(symbol: string): Promise<StockQuote> {
    try {
      const data = await this.makeRequest('quote', { symbol });
      
      return {
        symbol: data.symbol,
        name: data.name || data.symbol,
        price: parseFloat(data.close),
        change: parseFloat(data.change),
        changePercent: parseFloat(data.percent_change),
        volume: parseInt(data.volume) || undefined,
        marketCap: data.market_cap,
        pe: parseFloat(data.pe_ratio) || undefined,
        high52Week: parseFloat(data.fifty_two_week?.high) || undefined,
        low52Week: parseFloat(data.fifty_two_week?.low) || undefined
      };
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      throw error;
    }
  }

  async searchStocks(query: string): Promise<SearchResult[]> {
    try {
      const data = await this.makeRequest('symbol_search', { symbol: query });
      
      if (!data.data) {
        return [];
      }
      
      // Filter for Indian exchanges and format results
      return data.data
        .filter((stock: any) => 
          stock.exchange === 'BSE' || 
          stock.exchange === 'NSE' ||
          stock.country === 'India'
        )
        .slice(0, 10)
        .map((stock: any) => ({
          symbol: stock.symbol,
          name: stock.instrument_name || stock.symbol,
          exchange: stock.exchange,
          country: stock.country,
          type: stock.instrument_type
        }));
    } catch (error) {
      console.error('Error searching stocks:', error);
      return [];
    }
  }

  async getTimeSeries(symbol: string, interval: string = '1min', outputsize: number = 30) {
    try {
      const data = await this.makeRequest('time_series', {
        symbol,
        interval,
        outputsize: outputsize.toString()
      });
      
      if (!data.values) {
        throw new Error('No time series data available');
      }
      
      return Object.entries(data.values).map(([datetime, values]: [string, any]) => ({
        time: new Date(datetime).toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        price: parseFloat(values.close),
        volume: parseInt(values.volume) || 0,
        high: parseFloat(values.high),
        low: parseFloat(values.low),
        open: parseFloat(values.open)
      })).reverse(); // Reverse to show chronological order
    } catch (error) {
      console.error(`Error fetching time series for ${symbol}:`, error);
      throw error;
    }
  }
}

export const stockApi = new StockApiService();