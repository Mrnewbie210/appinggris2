import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Video, PenTool, BarChart2 } from 'lucide-react';
import logoUrl from '../../assets/logo.png';

const navItems = [
  { path: '/vocabulary', label: 'Dashboard', icon: Home },
  { path: '/library', label: 'Vocabulary', icon: BookOpen },
  { path: '/grammar', label: 'Grammar', icon: Video },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="hidden lg:flex w-64 bg-white border-r border-[#EDEDED] p-10 flex-col gap-10 h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="flex items-center justify-start -ml-6 -mr-6 -mt-4 mb-8">
        <img src={logoUrl} alt="English Every Day Logo" className="w-full h-auto object-contain mix-blend-multiply" />
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-3">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${active
                  ? 'bg-mint text-white shadow-lg shadow-mint/20'
                  : 'text-secondary hover:bg-gray-50'
                }`}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </div>


    </nav>
  );
};

export default Sidebar;
