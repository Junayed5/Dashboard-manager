import { ArrowUpRight } from "lucide-react";

export const StatCard = ({ title, value, growth, icon, active = false }) => (
  <div className={`p-6 rounded-[2rem] border transition-all ${
    active 
    ? 'bg-[#2395FF] border-blue-400 shadow-xl shadow-blue-200 text-white' 
    : 'bg-white border-slate-100 shadow-sm text-slate-800'
  }`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${active ? 'bg-white/20' : 'bg-slate-50'}`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${
        active ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600'
      }`}>
        <ArrowUpRight size={12} /> {growth}
      </div>
    </div>
    <p className={`text-xs font-bold uppercase tracking-widest ${active ? 'text-blue-100' : 'text-slate-400'}`}>{title}</p>
    <h2 className="text-2xl font-black mt-1 tracking-tight">{value}</h2>
  </div>
);