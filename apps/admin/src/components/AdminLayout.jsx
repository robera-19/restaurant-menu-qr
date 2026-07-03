import React, { useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const navLinks = [
    {
      name: 'Overview',
      path: '/dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: 'Menu',
      path: '/dashboard/menu',
      icon: Utensils,
    },
    {
      name: 'Categories',
      path: '/dashboard/categories',
      icon: Tag,
    },
    {
      name: 'QR Codes',
      path: '/dashboard/qr',
      icon: QrCode,
    },
    {
      name: 'Analytics',
      path: '/dashboard/analytics',
      icon: BarChart3,
    },
    {
      name: 'Ratings',
      path: '/dashboard/ratings',
      icon: Star,
    },
  ];

  const LinkItem = ({ link, mobile = false }) => (
    <NavLink
      to={link.path}
      end={link.exact}
      onClick={() => mobile && setIsOpen(false)}
      className={({ isActive }) =>
        `
          flex items-center gap-3 rounded-xl transition-all duration-200
          ${mobile ? 'px-4 py-3 text-sm' : 'px-3 py-3 text-[11px]'}
          ${
            isActive
              ? 'bg-orange-600 text-white shadow-lg'
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
          }
        `
      }
    >
      <link.icon size={mobile ? 22 : 18} />

      <span
        className={`font-bold uppercase tracking-widest ${
          mobile ? 'text-xs sm:text-sm' : 'text-[11px]'
        }`}
      >
        {link.name}
      </span>
    </NavLink>
  );

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      {/* ================= MOBILE SIDEBAR ================= */}

      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <aside
          className={`absolute left-0 top-0 w-[85vw] max-w-sm bg-slate-900 shadow-2xl
  h-[100dvh] flex flex-col
  transition-transform duration-300 ease-in-out
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Logo */}

          <div className="h-[64px] flex items-center justify-between px-5 border-b border-white/10 shrink-0">
            <h1 className="text-lg font-black text-orange-500 uppercase">
              Ethio Buna
            </h1>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-white/60 hover:bg-white/10"
            >
              <X size={22} />
            </button>
          </div>

          {/* SCROLL AREA */}
          <nav className="overflow-y-auto px-4 py-4 space-y-2">
  {navLinks.map((link) => (
    <LinkItem key={link.path} link={link} mobile />
  ))}
</nav>

          {/* FOOTER */}
          <div className="border-t border-white/10 p-4 flex-shrink-0 bg-slate-900">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 p-4 transition"
            >
              <LogOut size={20} />

              <span className="font-bold uppercase tracking-widest text-sm">
                Sign Out
              </span>
            </button>
          </div>
        </aside>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}

      <aside className="hidden lg:flex fixed inset-y-0 w-64 xl:w-72 bg-slate-900 text-white flex-col z-50">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-xl font-black uppercase italic text-orange-500">
            Ethio Buna
          </h1>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navLinks.map((link) => (
            <LinkItem key={link.path} link={link} />
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-2xl bg-red-500/5 hover:bg-red-500/10 text-red-400 p-4 transition"
          >
            <LogOut size={18} />

            <span className="text-xs font-black uppercase tracking-widest">
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="flex-1 w-full lg:ml-64 xl:ml-72 flex flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-white/90 backdrop-blur-md px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
            >
              <Menu size={20} />
            </button>

            <h2 className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-tight text-slate-800 truncate max-w-[45vw] lg:max-w-none">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-xs font-black lowercase leading-none">
                {admin?.fullName}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-widest font-black text-orange-600">
                {admin?.role}
              </p>
            </div>

            <img
              src={
                admin?.profileImage ||
                `https://ui-avatars.com/api/?name=${admin?.fullName}&background=ea580c&color=fff`
              }
              alt="Profile"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border-2 border-white shadow object-cover"
            />
          </div>
        </header>

        <div className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10 pb-24">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
