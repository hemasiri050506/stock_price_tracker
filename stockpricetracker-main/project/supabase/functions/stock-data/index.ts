import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface StockData {
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { symbol } = await req.json()
    
    // TwelveData API configuration
    const TWELVE_DATA_API_KEY = Deno.env.get('TWELVE_DATA_API_KEY')
    
    if (!TWELVE_DATA_API_KEY) {
      throw new Error('TwelveData API key not configured')
    }

    // Fetch real-time stock data from TwelveData
    const response = await fetch(
      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock data')
    }
    
    const data = await response.json()
    
    if (data.status === 'error') {
      throw new Error(data.message || 'API error')
    }

    // Transform TwelveData response to our format
    const stockData: StockData = {
      symbol: data.symbol,
      name: data.name || data.symbol,
      price: parseFloat(data.close),
      change: parseFloat(data.change),
      changePercent: parseFloat(data.percent_change),
      volume: parseInt(data.volume),
      marketCap: data.market_cap,
      pe: parseFloat(data.pe_ratio),
      high52Week: parseFloat(data.fifty_two_week.high),
      low52Week: parseFloat(data.fifty_two_week.low)
    }

    return new Response(
      JSON.stringify(stockData),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error fetching stock data:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to fetch stock data' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})