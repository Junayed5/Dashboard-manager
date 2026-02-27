import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Eye, CreditCard } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Login = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    axios.get("https://task-api-eight-flax.vercel.app/api/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.error(err));
  }, [setUsers]);

  const onSubmit = (data) => {
    const email = data.email;
    const user = users.find(u => u.email === email);
    if (user) {
      localStorage.setItem("user", JSON.stringify({userId: user.id, email: user.email}));
      navigate("/dashboard");
      toast.success("Login successful!");
    } else {
      toast.error("User not found. Please check your email.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-6 font-sans">
      {/* Main Container */}
      <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl flex overflow-hidden min-h-[750px] relative">

        {/* LEFT SIDE: FORM */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col z-10 bg-white">

          {/* Header Navigation */}
          <header className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#4A90E2] rounded-full"></div>
              <span className="font-bold text-xl tracking-tight text-[#0f172a]">Anywhere app<span className="text-[#4A90E2]">.</span></span>
            </div>
            <nav className="hidden sm:flex gap-8 text-slate-400 font-medium">
              <a href="#" className="hover:text-slate-600 transition-colors">Home</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Join</a>
            </nav>
          </header>

          {/* Form Content */}
          <div className="flex-1 max-w-md">
            <p className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-3">Start for free</p>
            <h1 className="text-5xl font-extrabold text-[#0f172a] mb-8 tracking-tight">
              Welcome Back<span className="text-[#4A90E2]">.</span>
            </h1>
            {/* <p className="text-slate-400 mb-10 font-medium">
              Already A Member? <a href="#" className="text-[#4A90E2] hover:underline font-bold">Log In</a>
            </p> */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Row */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 ml-4 mb-1 uppercase">First name</p>
                  <div className="relative">
                    <input
                      {...register("firstName", { required: true })}
                      className="w-full bg-[#f1f5f9] border-none rounded-2xl py-4 px-5 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-0"
                      placeholder="Michał"
                    />
                    <User className="absolute right-4 top-4 text-slate-400" size={18} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 ml-4 mb-1 uppercase">Last name</p>
                  <div className="relative">
                    <input
                      {...register("lastName", { required: true })}
                      className="w-full bg-[#f1f5f9] border-none rounded-2xl py-4 px-5 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-0"
                      placeholder="Masiak"
                    />
                    <CreditCard className="absolute right-4 top-4 text-slate-400" size={18} />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 ml-4 mb-1 uppercase">Email</p>
                <div className="relative">
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="w-full bg-[#f1f5f9] border-none rounded-2xl py-4 px-5 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-0"
                    placeholder="michal.masiak@anywhere.co"
                  />
                  <Mail className="absolute right-4 top-4 text-slate-400" size={18} />
                </div>
              </div>

              {/* Password Field */}
              {/* <div>
                <p className="text-[10px] font-bold text-[#4A90E2] ml-4 mb-1 uppercase">Password</p>
                <div className="relative">
                  <input 
                    {...register("password", { required: true })}
                    type="password"
                    className="w-full bg-white border-2 border-[#4A90E2] rounded-2xl py-4 px-5 font-bold text-slate-800 focus:ring-0"
                    placeholder="••••••••"
                  />
                  <Eye className="absolute right-4 top-4 text-slate-400" size={18} />
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-[#2395FF] text-white font-bold py-4 rounded-3xl shadow-xl shadow-blue-200 hover:bg-blue-600 transition-all active:scale-95"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: IMAGE WITH ORGANIC MASK */}
        <div className="hidden lg:block lg:w-1/2 relative">
          {/* The Organic Wave Mask Layer */}
          {/* <div className="absolute inset-0 z-20 pointer-events-none">
             <svg className="h-full w-auto translate-x-[-1px]" viewBox="0 0 300 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H300V800H0C100 700 0 550 150 400C300 250 100 100 0 0Z" fill="white"/>
                
                <path d="M1 0C101 100 301 250 151 400C1 550 101 700 1 800" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 6"/>
             </svg>
          </div> */}

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-blend-darken bg-black/60"
            style={{ backgroundImage: `url('https://i.ibb.co.com/qMBFbFbr/bg-dm.jpg')` }}
          >
            {/* Overlay Logo Watermark */}
            <div className="absolute bottom-12 right-12 opacity-80 scale-150">
              <div className="flex items-end gap-1">
                <div className="w-2 h-2 bg-white rounded-full mb-1"></div>
                <span className="text-white text-4xl font-black italic tracking-tighter">AW</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;