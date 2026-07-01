import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  LayoutDashboard,
  Utensils,
  Tag,
  QrCode,
  BarChart3,
  LogOut,
  Menu,
  X,
  Star,
} from 'lucide-react';

const AdminLayout = ({ children, title }) => {
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      name: 'Overview',
      path: '/dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    { name: 'Menu', path: '/dashboard/menu', icon: Utensils },
    { name: 'Categories', path: '/dashboard/categories', icon: Tag },
    { name: 'QR Codes', path: '/dashboard/qr', icon: QrCode },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Ratings', path: '/dashboard/ratings', icon: Star },
  ];

  const LinkItem = ({ link, mobile }) => (
    <NavLink
      to={link.path}
      end={link.exact}
      onClick={() => setIsOpen(false)}
      className={({ isActive }) => `
        flex items-center gap-3 rounded-xl transition-all
        ${mobile ? 'p-4' : 'p-3'}
        ${isActive ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}
      `}
    >
      <link.icon size={mobile ? 24 : 18} />
      <span
        className={`uppercase font-bold ${mobile ? 'text-sm' : 'text-[11px]'} tracking-widest`}
      >
        {link.name}
      </span>
    </NavLink>
  );

  return (
    <div className="flex min-h-dvh bg-[#fcfcfd]">
      {/* 1. MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 bottom-0 w-72 bg-slate-900 p-6 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-black text-orange-500 uppercase">
              Ethio Buna
            </h1>
            <button onClick={() => setIsOpen(false)} className="text-white/50">
              <X />
            </button>
          </div>
          <nav className="space-y-2">
            {navLinks.map((l) => (
              <LinkItem key={l.path} link={l} mobile />
            ))}
          </nav>
        </aside>
      </div>

      {/* 2. DESKTOP SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white fixed inset-y-0 hidden lg:flex flex-col z-50">
        <div className="p-8 border-b border-white/5">
          <h1 className="text-xl font-black text-orange-500 italic uppercase">
            Ethio Buna
          </h1>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navLinks.map((l) => (
            <LinkItem key={l.path} link={l} />
          ))}
        </nav>
        <div className="p-6 border-t border-white/5">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-3 p-4 text-red-400 bg-red-500/5 rounded-2xl hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            <span className="text-xs font-black uppercase tracking-widest">
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* 3. CONTENT AREA */}
      <main className="flex-1 lg:ml-64 w-full flex flex-col">
        <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 px-4 lg:px-10 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2.5 bg-slate-50 rounded-xl"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm lg:text-lg font-black text-slate-800 uppercase tracking-tight">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black lowercase leading-none">
                {admin?.fullName}
              </p>
              <p className="text-[8px] text-orange-600 font-black uppercase tracking-widest mt-1">
                {admin?.role}
              </p>
            </div>
            <img
              src={
                admin?.profileImage ||
                `https://ui-avatars.com/api/?name=${admin?.fullName}&background=ea580c&color=fff`
              }
              className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm object-cover"
              alt="p"
            />
          </div>
        </header>

        <div className="p-4 lg:p-10 flex-1 pb-32">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
