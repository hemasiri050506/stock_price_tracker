import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    
    const TWELVE_DATA_API_KEY = Deno.env.get('TWELVE_DATA_API_KEY')
    
    if (!TWELVE_DATA_API_KEY) {
      throw new Error('TwelveData API key not configured')
    }

    // Search for stocks using TwelveData symbol search
    const response = await fetch(
      `https://api.twelvedata.com/symbol_search?symbol=${encodeURIComponent(query)}&apikey=${TWELVE_DATA_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to search stocks')
    }
    
    const data = await response.json()
    
    if (data.status === 'error') {
      throw new Error(data.message || 'Search API error')
    }

    // Filter for Indian exchanges and format results
    const indianStocks = data.data
      ?.filter((stock: any) => 
        stock.exchange === 'BSE' || 
        stock.exchange === 'NSE' ||
        stock.country === 'India'
      )
      ?.slice(0, 10) // Limit results
      ?.map((stock: any) => ({
        symbol: stock.symbol,
        name: stock.instrument_name || stock.symbol,
        exchange: stock.exchange,
        country: stock.country,
        type: stock.instrument_type
      })) || []

    return new Response(
      JSON.stringify(indianStocks),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error searching stocks:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to search stocks' 
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