import { ArrowRight, Bell, Download, LayoutDashboard, Mail, PieChart, Plus, Search, Settings, Users } from "lucide-react"
import {
  TrendingUp, DollarSign, Activity,
  ArrowUpRight, MoreHorizontal,
  Play, Square
} from 'lucide-react';
import { NavItem } from "../components/NavItems"
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { StatCard } from "../components/StatCard";
import GrowthAnalytics from "../components/GrowthAnalytics";
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState({})
  const pathName = window.location.pathname;
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }


  useEffect(() => {
    axios.get(`https://task-api-eight-flax.vercel.app/api/users/${userData?.userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [userData?.userId]);

  useEffect(() => {
    axios.get("https://task-api-eight-flax.vercel.app/api/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    if (!userData && pathName === "/dashboard") {
      navigate("/login");
    }
  }, [pathName])

  return (
    <div className="flex min-h-screen  font-sans text-slate-900 p-4 lg:p-6 gap-6">

      {/* --- SIDEBAR --- */}
      <aside className="w-20 lg:w-64 bg-slate-100 rounded-[.5rem] shadow-sm border border-slate-100 flex flex-col items-center lg:items-stretch p-6">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
          <span className="hidden lg:block font-bold text-xl tracking-tight">Anywhere<span className="text-blue-500">.</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={22} />} label="Dashboard" active />
          <NavItem icon={<Users size={22} />} label="Team Members" />
          <NavItem icon={<PieChart size={22} />} label="Analytics" />
          <NavItem icon={<Settings size={22} />} label="Settings" />
          <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all`}>
            <ArrowRight size={22} />
            <span className="hidden lg:block font-semibold" onClick={() => handleLogOut()}>Logout</span>
          </div>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col gap-6">

        {/* Top Header */}
        <header className="flex items-center justify-between bg-slate-100 rounded-[1.5rem] p-6 shadow-sm">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full bg-white border-none rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-2xl shadow-sm text-slate-500 hover:text-blue-500 transition-colors">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-full shadow-sm">
              <div className="w-9 h-9 bg-slate-200 rounded-full overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michal" alt="avatar" />
              </div>
              <span className="text-sm font-semibold hidden md:block">{user?.name}</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen">

          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
              <p className="text-slate-500 font-medium">Monitor your app performance and user growth.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Download size={18} /> Export Data
              </button>
              <button className="flex items-center gap-2 bg-[#2395FF] px-5 py-2.5 rounded-2xl font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all">
                <Plus size={18} /> Add User
              </button>
            </div>
          </div>

          {/* STATS GRID (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value={`$${data?.overview?.revenue.toLocaleString()}`} growth={data?.overview?.growth} icon={<DollarSign className="text-blue-500" />} active />
            <StatCard title="Total Users" value={data?.overview?.totalUsers.toLocaleString()} growth="+12%" icon={<Users className="text-slate-400" />} />
            <StatCard title="Active Now" value={data?.overview?.activeUsers.toLocaleString()} growth="+5.4%" icon={<Activity className="text-slate-400" />} />
            <StatCard title="Growth Rate" value={`${data?.overview?.growth}%`} growth="+2.1%" icon={<TrendingUp className="text-slate-400" />} />
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Analytics Chart Block (Re-interpreting Image 2) */}
            <GrowthAnalytics data={data.analytics} />

            {/* Product Sales Block */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-800">Top Products</h3>
                <button className="text-[#2395FF] font-bold text-sm">View all</button>
              </div>
              <div className="space-y-6">
                {data.products?.map(product => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-500 font-bold">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{product.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800 text-sm">${product.price}</p>
                      <p className="text-[10px] text-green-500 font-bold">{product.sales} sold</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Collaboration / Users Block (Matching Image 1 style) */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-800">Recent Members</h3>
                <div className="flex gap-2">
                  <button className="bg-slate-50 text-slate-400 p-2 rounded-xl"><Download size={16} /></button>
                  <button className="bg-slate-50 text-slate-400 p-2 rounded-xl"><MoreHorizontal size={16} /></button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-widest border-b border-slate-50">
                      <th className="pb-4 pl-4">Member</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Join Date</th>
                      <th className="pb-4 text-right pr-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.users?.map(user => (
                      <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                              {user.name.split(' ')?.map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                              <p className="text-xs text-slate-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                            }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm font-medium text-slate-500">{user.joinDate}</td>
                        <td className="py-4 text-right pr-4">
                          <button className="text-slate-300 hover:text-blue-500 transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Time Tracker Block (Matching Image 2's specific element) */}
            <div className="rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl bg-cover bg-center"
              style={{ backgroundImage: `url('https://i.ibb.co.com/ycXhZr88/image.png')` }}>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Time Tracker</p>
                  <h3 className="text-3xl font-mono font-bold tracking-tighter">01:24:08</h3>
                </div>

                <div className="flex gap-4 mt-8">
                  <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all">
                    <Play size={20} fill="white" />
                  </button>
                  <button className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-red-500/20">
                    <Square size={20} fill="white" />
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full"></div>
              <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 bg-indigo-500/10 blur-[40px] rounded-full"></div>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
};

export default Dashboard;
