# StockBlossom 🌸 - Pastel Stock Price Tracker

A beautiful, pastel-themed stock price tracker designed specifically for Indian markets with real-time data from TwelveData API.

## ✨ Features

- 🎨 **Pastel Girlish Aesthetic** - Soft pink, purple, and mint color palette
- 📊 **Real-time Stock Data** - Powered by TwelveData API
- 💕 **Personal Watchlists** - Add and manage your favorite Indian stocks
- 📈 **Interactive Charts** - Beautiful stock price visualizations
- 🔐 **User Authentication** - Secure sign up and sign in
- 📱 **Responsive Design** - Works perfectly on all devices
- 🇮🇳 **Indian Market Focus** - BSE and NSE stocks with INR pricing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- TwelveData API key (free tier available)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Get your TwelveData API key:
   - Visit [TwelveData.com](https://twelvedata.com)
   - Sign up for a free account
   - Copy your API key from the dashboard

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your TwelveData API key to the `.env` file:
   ```
   VITE_TWELVE_DATA_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 API Setup

The app includes a built-in API key setup interface:

1. Click "Setup Real-time Data" on the dashboard
2. Enter your TwelveData API key
3. The app will validate the key and enable real-time features

## 📊 Supported Features

### Stock Data
- Real-time price quotes
- Historical price charts
- Stock search functionality
- Market statistics (P/E ratio, market cap, etc.)

### User Features
- Personal watchlists
- Portfolio tracking
- Stock performance analytics
- Mobile-responsive interface

## 🎨 Design Philosophy

StockBlossom combines functionality with beauty, featuring:
- Soft gradients and glass-morphism effects
- Rounded corners and subtle shadows
- Smooth animations and micro-interactions
- Intuitive navigation and user experience

## 🔗 API Integration

The app uses TwelveData API for:
- Real-time stock quotes
- Stock symbol search
- Historical price data
- Market statistics

Fallback to mock data ensures the app works even without API configuration.

## 📱 Responsive Design

Optimized for:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes and orientations

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: TwelveData REST API

## 📈 Indian Stock Market Support

Focused on Indian exchanges:
- Bombay Stock Exchange (BSE)
- National Stock Exchange (NSE)
- INR currency formatting
- Indian market hours consideration

## 🎯 Target Audience

Perfect for:
- Indian retail investors
- Stock market enthusiasts
- Users who appreciate beautiful UI/UX
- Mobile-first investors

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with 💕 for the Indian stock market community