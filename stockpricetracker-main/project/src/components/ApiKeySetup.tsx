import React, { useState } from 'react';
import { Key, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

const ApiKeySetup = () => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateApiKey = async () => {
    if (!apiKey.trim()) return;
    
    setIsValidating(true);
    try {
      const response = await fetch(`https://api.twelvedata.com/quote?symbol=AAPL&apikey=${apiKey}`);
      const data = await response.json();
      
      if (data.status === 'error') {
        setIsValid(false);
      } else {
        setIsValid(true);
        localStorage.setItem('twelvedata_api_key', apiKey);
      }
    } catch (error) {
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-200">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup TwelveData API</h2>
        <p className="text-gray-600">
          To get real-time stock data, you'll need a TwelveData API key.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your TwelveData API key"
              className="w-full px-4 py-3 bg-pink-50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            />
            {isValid === true && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {isValid === false && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
        </div>

        <button
          onClick={validateApiKey}
          disabled={!apiKey.trim() || isValidating}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating ? 'Validating...' : 'Validate API Key'}
        </button>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">How to get your API key:</h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Visit <a href="https://twelvedata.com" target="_blank" rel="noopener noreferrer" className="underline">TwelveData.com</a></li>
            <li>2. Sign up for a free account</li>
            <li>3. Go to your dashboard and copy your API key</li>
            <li>4. Paste it above and click validate</li>
          </ol>
          <a
            href="https://twelvedata.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-700 font-medium"
          >
            View Pricing Plans
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        {isValid === false && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800 text-sm">
              Invalid API key. Please check your key and try again.
            </p>
          </div>
        )}

        {isValid === true && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-800 text-sm">
              ✅ API key validated successfully! You can now access real-time stock data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeySetup;