import { motion } from "framer-motion"; // 1. Import Framer Motion
import { ArrowRight, Bell, Download, LayoutDashboard, Mail, PieChart, Plus, Search, Settings, Users, TrendingUp, DollarSign, Activity, ArrowUpRight, MoreHorizontal, Play, Square } from "lucide-react";
import { NavItem } from "../components/NavItems";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { StatCard } from "../components/StatCard";
import GrowthAnalytics from "../components/GrowthAnalytics";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

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



  return (
    <div className="flex min-h-screen font-sans text-slate-900 p-4 lg:p-6 gap-6 bg-[#F8FAFC]">

      {/* --- SIDEBAR (Slide in from left) --- */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-20 lg:w-64 bg-slate-100 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col items-center lg:items-stretch p-6"
      >
        <div className="flex items-center gap-3 px-2 mb-10">
          <img className='size-8' src="https://i.ibb.co.com/pj92KWBv/dashboard.png" alt="dbm" />
          <span className="hidden lg:block font-bold text-xl tracking-tight">DBM<span className="text-blue-500">.</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={22} />} label="Dashboard" active />
          <NavItem icon={<Users size={22} />} label="Team Members" />
          <NavItem icon={<PieChart size={22} />} label="Analytics" />
          <NavItem icon={<Settings size={22} />} label="Settings" />

          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all hover:bg-red-50 hover:text-red-500 mt-10"
            onClick={handleLogOut}
          >
            <ArrowRight size={22} />
            <span className="hidden lg:block font-semibold">Logout</span>
          </motion.div>
        </nav>
      </motion.aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col gap-6">

        {/* Header (Fade Down) */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100"
        >
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3 bg-slate-50 rounded-2xl text-slate-500 hover:text-blue-500">
              <Bell size={20} />
            </motion.button>
            <div className="flex items-center gap-3 bg-slate-50 p-1.5 pr-4 rounded-full">
              <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span className="text-sm font-semibold hidden md:block">{user?.name}</span>
            </div>
          </div>
        </motion.header>

        <div className="space-y-8">
          {/* Dashboard Title Section */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
              <p className="text-slate-500 font-medium">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex gap-3">
              <motion.button whileHover={{ y: -2 }} className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl font-bold text-slate-600 shadow-sm">
                <Download size={18} /> Export
              </motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-[#2395FF] px-5 py-2.5 rounded-2xl font-bold text-white shadow-lg shadow-blue-200">
                <Plus size={18} /> Add User
              </motion.button>
            </div>
          </motion.div>

          {/* STATS GRID (Staggered Pop-up) */}
          <motion.div
            variants={staggerContainer} initial="initial" animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={fadeInUp}><StatCard title="Total Revenue" value={`$${data?.overview?.revenue?.toLocaleString()}`} growth={data?.overview?.growth} icon={<DollarSign className="text-blue-500" />} active /></motion.div>
            <motion.div variants={fadeInUp}><StatCard title="Total Users" value={data?.overview?.totalUsers?.toLocaleString()} growth="+12%" icon={<Users className="text-slate-400" />} /></motion.div>
            <motion.div variants={fadeInUp}><StatCard title="Active Now" value={data?.overview?.activeUsers?.toLocaleString()} growth="+5.4%" icon={<Activity className="text-slate-400" />} /></motion.div>
            <motion.div variants={fadeInUp}><StatCard title="Growth Rate" value={`${data?.overview?.growth}%`} growth="+2.1%" icon={<TrendingUp className="text-slate-400" />} /></motion.div>
          </motion.div>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">

            {/* Analytics - Zoom in effect */}
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
              <GrowthAnalytics data={data.analytics || []} />
            </motion.div>

            {/* Product Sales - Slide in from right */}
            <motion.div
              initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-8">Top Products</h3>
              <div className="space-y-6">
                {data.products?.map((product, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                    key={product.id} className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-500 font-bold group-hover:bg-blue-500 group-hover:text-white transition-all">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{product.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800 text-sm">${product.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Table - Staggered Rows */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-8">Recent Members</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-widest border-b border-slate-50">
                      <th className="pb-4 pl-4">Member</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right pr-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.users?.map((user, idx) => (
                      <motion.tr
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + (idx * 0.05) }}
                        key={user.id} className="group hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                              {user.name.split(' ')?.map(n => n[0]).join('')}
                            </div>
                            <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 text-right pr-4">
                          <MoreHorizontal className="text-slate-300 ml-auto cursor-pointer hover:text-slate-600" size={18} />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Time Tracker - Glow Animation */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl bg-cover bg-center"
              style={{ backgroundImage: `url('https://i.ibb.co.com/ycXhZr88/image.png')` }}
            >
              <div className="relative z-10">
                <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Live Tracker</p>
                <h3 className="text-4xl font-mono font-bold tracking-tighter mb-8">01:24:08</h3>
                <div className="flex gap-4">
                  <motion.button whileTap={{ scale: 0.9 }} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/30">
                    <Play size={20} fill="white" />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/40">
                    <Square size={20} fill="white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;