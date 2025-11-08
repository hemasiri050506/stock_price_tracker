import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Heart, BarChart3, Shield, Smartphone, Globe } from 'lucide-react';
import StockChart from '../components/StockChart';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/30 via-transparent to-purple-200/30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Track Your{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Favorite Stocks
              </span>
              <br />
              With Style ✨
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Beautiful, intuitive stock tracking designed especially for Indian markets. 
              Build your watchlist, track performance, and make informed decisions with our 
              adorable interface.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Tracking Now
              <TrendingUp className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          {/* Cute illustration placeholder */}
          <div className="mt-16 relative z-10">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mx-auto max-w-4xl border border-pink-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mock stock cards */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">RELIANCE</span>
                    <span className="text-green-600 text-sm">+1.61%</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">₹2,847.60</div>
                  <div className="text-sm text-gray-600">Reliance Industries</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">TCS</span>
                    <span className="text-red-600 text-sm">-0.77%</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">₹4,125.75</div>
                  <div className="text-sm text-gray-600">Tata Consultancy</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">HDFCBANK</span>
                    <span className="text-green-600 text-sm">+1.36%</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">₹1,678.90</div>
                  <div className="text-sm text-gray-600">HDFC Bank</div>
                </div>
              </div>
              
              {/* Mini Chart Preview */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Live Market Trends ✨</h3>
                <div className="h-32">
                  <StockChart isPositive={true} basePrice={2847} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why You'll Love StockBlossom 💕
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've designed every feature with love, making stock tracking both beautiful and intuitive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-8 rounded-3xl border border-pink-200">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Watchlists</h3>
              <p className="text-gray-600">
                Create beautiful watchlists for your favorite Indian stocks. Add, remove, and organize 
                your investments with our intuitive interface.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-8 rounded-3xl border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Data</h3>
              <p className="text-gray-600">
                Get live stock prices and market data from TwelveData API. Stay updated with 
                real-time changes in the Indian stock market.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-3xl border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mobile Friendly</h3>
              <p className="text-gray-600">
                Track your stocks on the go with our responsive design. Beautiful on desktop, 
                tablet, and mobile - wherever you are.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-8 rounded-3xl border border-yellow-200">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Indian Market Focus</h3>
              <p className="text-gray-600">
                Specially designed for Indian investors. Track BSE and NSE stocks with INR pricing 
                and local market insights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-8 rounded-3xl border border-cyan-200">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is safe with us. We use secure authentication and never share your 
                personal information or trading data.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 rounded-3xl border border-indigo-200">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Analytics</h3>
              <p className="text-gray-600">
                Get insights into your portfolio performance with beautiful charts and analytics. 
                Make informed decisions with our data-driven approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Stock Journey? 🚀
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Indian investors who trust StockBlossom for their daily stock tracking needs.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Create Free Account
            <Heart className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;