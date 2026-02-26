import { MoreHorizontal, Shield } from "lucide-react";

export const ManagerRow = ({ name, role, email }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-white transition-colors">
        <Shield size={20} />
      </div>
      <div>
        <h4 className="font-bold text-slate-800">{name}</h4>
        <p className="text-xs text-slate-400">{role}</p>
      </div>
    </div>
    <div className="hidden md:block text-sm text-slate-500 font-medium">
      {email}
    </div>
    <button className="p-2 text-slate-300 hover:text-slate-600">
      <MoreHorizontal size={20} />
    </button>
  </div>
);