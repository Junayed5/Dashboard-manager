export const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
    active ? 'bg-blue-100 text-blue-600' : 'text-black hover:bg-white hover:text-slate-600'
  }`}>
    {icon}
    <span className="hidden lg:block font-semibold">{label}</span>
  </div>
);