import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Mail, Lock, LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import logoUrl from '../assets/logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password harus diisi.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Jika sukses, onAuthStateChange di App.tsx akan mendeteksi session baru
    } catch (err: any) {
      console.error('Login error:', err.message);
      if (err.message === 'Invalid login credentials') {
        setError('Email atau kata sandi salah.');
      } else {
        setError(err.message || 'Gagal masuk. Silakan coba lagi.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-mint/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-peach/20 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8 flex flex-col items-center overflow-hidden">
          <div className="-mt-12 -mb-8 flex justify-center w-full">
            <img src={logoUrl} alt="English Every Day Logo" className="w-80 max-w-none h-auto object-contain mix-blend-multiply scale-125" />
          </div>
          
          <p className="text-secondary opacity-80 mb-8 text-center text-sm">
            Platform akses tertutup. Masukkan kredensial yang diberikan admin.
          </p>

          {error && (
            <div className="w-full bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 mb-6 text-sm font-medium">
              <AlertCircle size={16} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-charcoal ml-1">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@domain.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-mint focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-2">
              <label className="text-sm font-bold text-charcoal ml-1">Kata Sandi</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-mint focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-mint py-3.5 px-4 rounded-xl font-bold text-white hover:bg-mint/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-mint/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                'Memeriksa...'
              ) : (
                <>
                  Masuk ke Sistem
                  <LogIn size={18} />
                </>
              )}
            </button>
          </form>
          
          <p className="text-[11px] text-gray-400 mt-6 font-medium text-center">
            Hubungi admin jika Anda lupa kata sandi atau butuh akses baru.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
