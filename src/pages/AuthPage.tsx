import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-redirect if already logged in
  useEffect(() => {
    import('../lib/mockAuth').then(({ getActiveSession }) => {
      getActiveSession().then(({ data: { session } }) => {
        if (session) {
          navigate('/vocabulary');
        }
      });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate('/vocabulary');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const safeEmail = email.trim();
    const safeName = name.trim();

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: safeEmail,
          password
        });
        if (error) throw error;
      } else {
        const { error: signUpError, data } = await supabase.auth.signUp({
          email: safeEmail,
          password,
          options: {
            data: { full_name: safeName }
          }
        });
        if (signUpError) throw signUpError;

        if (data.user) {
          // Initialize zero XP row immediately
          await supabase.from('user_progress').insert({
             user_id: data.user.id,
             display_name: safeName || 'Student',
             xp: 0,
             streak_days: 0
          }).select().single();
        }

        if (data.user && data.session === null) {
          setError('Success! Please check your email to verify your account.');
          setEmail('');
          setPassword('');
          setName('');
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      console.error("FULL ERROR OBJECT:", err);
      alert(`DEBUG ERROR: ${err?.message || 'Unknown'} (Status: ${err?.status || 'N/A'})\n\nDetails: ${JSON.stringify(err)}`);
      
      if (err.message?.includes("Password should be")) {
        setError("Katasandi harus minimal 6 karakter.");
      } else if (err.message?.includes("Invalid login")) {
        setError("Email atau katasandi salah. Pastikan kamu sudah mendaftar!");
      } else if (err.message?.includes("rate limit")) {
        setError("Terlalu banyak percobaan. Harap tunggu sebentar.");
      } else if (err.message?.includes("already registered")) {
        setError("Email ini sudah terdaftar. Silakan Masuk (Sign In).");
      } else {
        setError(err.message || 'Terjadi kesalahan sistem.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-mint text-white rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-mint/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4 11 8-8 8 8"/>
              <path d="M4 21V11"/>
              <path d="M20 21V11"/>
              <path d="M10 21v-4a2 2 0 0 1 4 0v4"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black text-charcoal tracking-tight">AppInggris</h1>
          <p className="text-gray-500 font-medium mt-1">Platform Belajar Bahasa Inggris</p>
        </div>

        <Card className="p-8 border-2 border-mint/20 shadow-xl relative overflow-hidden">
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8 relative">
            <motion.div 
               className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
               initial={false}
               animate={{ left: isLogin ? '4px' : 'calc(50%)' }}
               transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            <button 
              type="button"
              onClick={() => { setIsLogin(true); setError(null); }}
              className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${isLogin ? 'text-charcoal' : 'text-gray-400'}`}
            >
              Sign In
            </button>
            <button 
              type="button"
              onClick={() => { setIsLogin(false); setError(null); }}
              className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${!isLogin ? 'text-charcoal' : 'text-gray-400'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      required={!isLogin}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anda@email.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-all"
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-3 rounded-xl text-sm font-bold flex items-start gap-2 ${error.includes('Success') ? 'bg-mint/10 text-mint' : 'bg-red-50 text-red-500'}`}
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-mint text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-mint/90 transition-colors disabled:opacity-70 shadow-md shadow-mint/20"
            >
              {isLoading ? (
                <Loader className="animate-spin" size={20} />
              ) : isLogin ? (
                <>
                  <LogIn size={20} /> Masuk
                </>
              ) : (
                <>
                  <UserPlus size={20} /> Daftar Sekarang
                </>
              )}
            </button>
          </form>
        </Card>
        
        <p className="text-center text-gray-400 text-xs font-bold mt-8">
          &copy; {new Date().getFullYear()} AppInggris. Built securely.
        </p>
      </motion.div>
    </div>
  );
}
