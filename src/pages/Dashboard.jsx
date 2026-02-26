import { Bell, LayoutDashboard, Mail, PieChart, Search, Settings, Users } from "lucide-react"
import { NavItem } from "../components/NavItems"
// import { useForm } from "react-hook-form";

import { useForm } from "react-hook-form";
import { ManagerRow } from "../components/ManageRow";
const Dashboard = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex min-h-screen  font-sans text-slate-900 p-4 lg:p-6 gap-6">

      {/* --- SIDEBAR --- */}
      <aside className="w-20 lg:w-64 bg-slate-100 rounded-[.5rem] shadow-sm border border-slate-100 flex flex-col items-center lg:items-stretch p-6">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
          <span className="hidden lg:block font-bold text-xl tracking-tight">Anywhere<span className="text-blue-500">.</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={22} />} label="Overview" active />
          <NavItem icon={<Users size={22} />} label="Team Members" />
          <NavItem icon={<PieChart size={22} />} label="Analytics" />
          <NavItem icon={<Settings size={22} />} label="Settings" />
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
              <span className="text-sm font-semibold hidden md:block">Michał Masiak</span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-[1.5rem] shadow-sm">

          {/* Left Column: Form Section (Matching your image style) */}
          <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-1">Add Manager</h2>
            <p className="text-slate-400 text-sm mb-6">Assign a new member to the team.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <div className="relative">
                  <input
                    {...register("fullName")}
                    placeholder="Full Name"
                    className="w-full bg-slate-100 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                  />
                  <Users className="absolute right-4 top-4 text-slate-300" size={20} />
                </div>
              </div>

              <div className="relative">
                <input
                  {...register("email")}
                  placeholder="Email Address"
                  className="w-full bg-slate-100 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                />
                <Mail className="absolute right-4 top-4 text-slate-300" size={20} />
              </div>

              <button className="w-full bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all active:scale-[0.98]">
                Create account
              </button>
            </form>
          </div>

          {/* Right Column: Data Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm h-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Active Managers</h2>
                <button className="text-blue-500 font-semibold text-sm">View all</button>
              </div>

              <div className="space-y-4">
                <ManagerRow name="Michał Masiak" role="Senior Designer" email="michal@anywhere.co" />
                <ManagerRow name="Sarah Connor" role="Product Manager" email="sarah@anywhere.co" />
                <ManagerRow name="David Blake" role="Backend Developer" email="david@anywhere.co" />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
};

export default Dashboard;
