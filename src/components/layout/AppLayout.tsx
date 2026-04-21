import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Card } from '../ui/Card';
import { userData } from '../../lib/utils';

/** Right-hand aside panel — only shown on Home route on desktop */
const HomeAside = () => (
  <aside className="hidden lg:flex flex-col gap-6 w-[300px] shrink-0">
    {/* Streak card */}
    <Card className="bg-charcoal text-white text-center py-8">
      <p className="text-sm opacity-80 mb-1">Belajar Beruntun</p>
      <div className="text-5xl font-black text-mint mb-2">{userData.streak}</div>
      <p className="text-xs font-bold tracking-widest opacity-90 uppercase">HARI STREAK!</p>
    </Card>

    {/* Flashcard preview */}
    <Card className="bg-peach h-[180px] flex flex-col items-center justify-center text-center cursor-pointer border-none shadow-none">
      <div className="text-[12px] uppercase tracking-widest font-bold opacity-60 mb-2">
        Flashcard Hari Ini
      </div>
      <div className="text-2xl font-extrabold mb-2">Persistence</div>
      <div className="text-xs opacity-70 mb-4">Klik untuk melihat arti</div>
      <div className="flex gap-2">
        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-charcoal border border-[#DDD]">
          Sudah Hafal
        </span>
        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/10 text-charcoal">
          Ulangi
        </span>
      </div>
    </Card>

    {/* Grammar preview */}
    <Card>
      <div className="font-bold text-sm mb-4">Tata Bahasa Terakhir</div>
      <div className="flex flex-col gap-3">
        {[
          { title: 'Past Tense', duration: '08:45 menit' },
          { title: 'Future Tense', duration: '12:20 menit' },
        ].map((g, i) => (
          <div
            key={i}
            className="flex gap-3 items-center p-3 bg-white border border-[#EEE] rounded-2xl"
          >
            <div className="w-20 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-[10px]">
              ▶
            </div>
            <div>
              <div className="text-xs font-bold">{g.title}</div>
              <div className="text-[10px] text-secondary">{g.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>

    {/* Quote */}
    <div className="quote-box">
      "Belajar sedikit demi sedikit, lama-lama menjadi bukit. Konsistensi adalah kunci
      penguasaan bahasa."
    </div>
  </aside>
);

export const AppLayout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/dashboard' || pathname === '/';

  return (
    <div className="min-h-screen bg-warm-white flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 p-4 pb-32 lg:p-10 lg:pb-10 max-w-7xl mx-auto w-full">
        <main className="flex-1 max-w-2xl w-full">
          {/* Desktop page header */}
          <header className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-charcoal">Halo, Budi! 👋</h1>
            <p className="text-secondary opacity-60">
              Minggu, 19 April 2026 • Semangat belajarnya!
            </p>
          </header>

          {/* Page content rendered here */}
          <Outlet />
        </main>

        {/* Desktop right aside — only on home route */}
        {isHome && <HomeAside />}
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav />

      {/* Decorative ambient blurs */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-mint/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-peach/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
    </div>
  );
};

export default AppLayout;
