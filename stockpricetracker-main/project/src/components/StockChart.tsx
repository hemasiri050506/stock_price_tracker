import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface StockChartProps {
  data?: Array<{
    time: string;
    price: number;
    volume?: number;
  }>;
  isPositive?: boolean;
  basePrice?: number;
}

// Mock chart data for demonstration
const generateMockData = (basePrice: number = 2500, isPositive: boolean) => {
  const data = [];
  const points = 30;
  let currentPrice = basePrice;
  
  for (let i = 0; i < points; i++) {
    const variation = (Math.random() - 0.5) * (basePrice * 0.01); // Smaller variation
    const trend = isPositive ? i * 2 : -i * 1.5; // More noticeable trend
    currentPrice = basePrice + trend + variation;
    
    data.push({
      time: `${9 + Math.floor(i / 6)}:${String((i % 6) * 10).padStart(2, '0')}`,
      price: Number(Math.max(currentPrice, basePrice * 0.98).toFixed(2)),
      volume: Math.floor(Math.random() * 10000) + 5000
    });
  }
  
  return data;
};

const StockChart: React.FC<StockChartProps> = ({ data, isPositive = true, basePrice = 2500 }) => {
  const chartData = data || generateMockData(basePrice, isPositive);
  
  const gradientId = isPositive ? 'colorPositive' : 'colorNegative';
  const strokeColor = isPositive ? '#10b981' : '#ef4444';
  const fillColor = isPositive ? '#10b981' : '#ef4444';
  
  // Calculate proper Y-axis domain
  const prices = chartData.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice) * 0.1; // 10% padding
  const yAxisMin = Math.max(0, minPrice - padding);
  const yAxisMax = maxPrice + padding;

  return (
    <div className="w-full h-64 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-100">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={fillColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={fillColor} stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
            domain={[yAxisMin, yAxisMax]}
            tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            width={80}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #f1f5f9',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Price']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={strokeColor}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ 
              r: 4, 
              fill: strokeColor,
              stroke: '#fff',
              strokeWidth: 2
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;