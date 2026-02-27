import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';

const GrowthAnalytics = ({ data }) => {
  const chartData = data?.map(item => {
  const dateObj = new Date(item.date);
  return {
    ...item,
    formattedDate: dateObj.toLocaleDateString('en-GB', {
      day: '2-digit', 
      month: 'short',
    }).toUpperCase()
  };
});

  return (
    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#0f172a]">Growth Analytics</h3>
        <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
          <option>Last 7 Days</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2395FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2395FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold'
              }} 
            />
            
            <Area 
              type="monotone" 
              dataKey="views" 
              stroke="#2395FF" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorViews)" 
            />

            <XAxis 
              dataKey="formattedDate" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthAnalytics;