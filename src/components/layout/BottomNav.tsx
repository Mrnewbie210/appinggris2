import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, BookOpen, Video, PenTool, BarChart2 } from 'lucide-react';

const navItems = [
  { path: '/vocabulary', label: 'Dashboard', icon: Home },
  { path: '/library', label: 'Vocabulary', icon: BookOpen },
  { path: '/grammar', label: 'Grammar', icon: Video },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white border border-gray-100 px-2 py-2 rounded-[24px] custom-shadow z-50 flex items-center justify-between">
      {navItems.map(({ path, label, icon: Icon }) => {
        const active = pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`relative flex flex-col items-center gap-1 flex-1 py-1 px-1 transition-all duration-300 ${active ? 'text-mint' : 'text-gray-400'}`}
          >
            <div className={`p-2 rounded-2xl transition-all ${active ? 'bg-mint/10' : ''}`}>
              <Icon size={20} />
            </div>
            <span className="text-[10px] font-bold">{label}</span>
            {active && (
              <motion.div
                layoutId="bottom-nav-dot"
                className="absolute -bottom-1 w-1 h-1 bg-mint rounded-full"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
