'use client';

import { useState, useEffect } from 'react';
import ProblemSwipeCard from '@/components/ProblemSwipeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, X, Check, ArrowRight, Sparkles, TrendingUp, Users, Zap, Terminal, CornerRightUp, RotateCw, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [problems, setProblems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHuntiing, setIsHunting] = useState(false);
  const [countdown, setCountdown] = useState(3600); // 1 Hour Countdown

  const triggerAIHunt = async () => {
    setIsHunting(true);
    try {
      const res = await fetch('/api/hunt');
      const data = await res.json();
      if (data.success) {
        setProblems(prev => [data.newProblem, ...prev]);
        setCurrentIndex(prev => prev + 1);
        setCountdown(3600);
      }
    } catch (err) {}
    setIsHunting(false);
  };

  useEffect(() => {
    triggerAIHunt();
    const saved = localStorage.getItem('pb_favorites');
    if (saved) setFavorites(JSON.parse(saved));
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          triggerAIHunt();
          return 3600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const swiped = (direction: string, id: string) => {
    if (direction === 'right') {
      const newFavs = [...new Set([...favorites, id])];
      setFavorites(newFavs);
      localStorage.setItem('pb_favorites', JSON.stringify(newFavs));
    }
    setCurrentIndex(currentIndex - 1);
  };

  const m = Math.floor(countdown / 60);
  const s = countdown % 60;

  return (
    <div className="relative min-h-screen bg-[#000] text-white selection:bg-[#3E6BFF]/30 pt-20">
      
      <section className="relative w-full h-[100vh] lg:h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-[0.15] z-0" />
        
        <div className="absolute top-10 right-10 flex items-center gap-4 z-50 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
             <div className="flex flex-col items-end">
                <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest">Next Auto-Hunt</span>
                <span className="text-sm font-black text-white">{m}m {s}s</span>
             </div>
             <div className={`w-8 h-8 rounded-full bg-indigo-500/10 grid place-items-center text-indigo-400 ${isHuntiing ? 'animate-spin' : ''}`}>
                <RefreshCw className="w-4 h-4" />
             </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-10 flex flex-col lg:flex-row items-center gap-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1 text-center lg:text-left space-y-10">
                <div className="inline-flex items-center gap-2 px-6 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#3E6BFF]">
                    <Terminal className="w-4 h-4" /> THE FIX-ITCH INITIATIVE (V2.1)
                </div>
                <h1 className="text-8xl md:text-[8vw] font-black tracking-tighter leading-[0.85] mb-10 drop-shadow-2xl">
                    HUNT FOR<br /><span className="text-white/20 text-outline">PROBLEMS.</span>
                </h1>
                <p className="text-xl text-gray-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12 opacity-80">
                   Automated discovery powered by <span className="text-indigo-400">Llama 3 Processor</span> on Probnest. India's friction points updated hourly.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                     <button onClick={triggerAIHunt} disabled={isHuntiing} className="px-10 py-5 bg-[#3E6BFF] text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-white hover:text-black transition-all shadow-xl flex items-center gap-3">
                       {isHuntiing ? 'Hunting...' : 'Manual Hunt'} <RefreshCw className={`w-4 h-4 ${isHuntiing ? 'animate-spin' : ''}`} />
                     </button>
                </div>
            </motion.div>

            <div className="relative h-[650px] w-full max-w-[480px] perspective-1000">
               <AnimatePresence mode="popLayout">
                {currentIndex >= 0 ? (
                    problems.slice(0, currentIndex + 1).map((prob, idx) => (
                      <ProblemSwipeCard 
                        key={prob._id} 
                        problem={{
                          ...prob,
                          description: prob.problemDescription || prob.description
                        }} 
                        onSwipe={(dir) => swiped(dir, prob._id)} 
                        isTop={idx === currentIndex} 
                        stackIndex={currentIndex - idx}
                      />
                    ))
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full rounded-[60px] bg-[#3E6BFF] p-12 flex flex-col items-center justify-center text-center shadow-2xl relative">
                       <h3 className="text-5xl font-black mb-6 tracking-tight">Stack Cleared.</h3>
                       <p className="text-white/70 font-bold mb-14 text-sm max-w-[250px] mx-auto leading-relaxed">Wait for the hourly refresh or trigger a manual hunt above.</p>
                       <Link href="/favorites" className="px-12 py-5 bg-white text-[#3E6BFF] font-black uppercase text-xs tracking-widest rounded-full hover:bg-black hover:text-white transition-all">Go To Repository</Link>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
        </div>
      </section>

      <section className="w-full bg-[#0B0D11] border-y border-white/[0.08] py-40">
          <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center lg:text-left">
             <div className="space-y-4">
                <TrendingUp className="w-10 h-10 text-[#3E6BFF] mx-auto lg:mx-0" />
                <h4 className="text-3xl font-black text-white leading-tight mt-6 tracking-tighter uppercase">INDIA'S LARGEST AI-HUNTED REPOSITORY ON PROBNEST</h4>
             </div>
             <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-10">
                {[
                  { label: "INSIGHTS HUNTED", value: "24.5k+" },
                  { label: "AI FOUNDERS", value: "1,200+" },
                  { label: "HUNTED PER HOUR", value: "1" },
                  { label: "NEST CONFIDENCE", value: "98%" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2 group">
                      <span className="block text-5xl lg:text-7xl font-black text-white group-hover:text-[#3E6BFF] transition-colors leading-none tracking-tighter">{stat.value}</span>
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</span>
                  </div>
                ))}
             </div>
          </div>
      </section>

      <footer className="w-full bg-[#000] border-t border-white/[0.08] py-20 px-10 text-center">
          <h2 className="text-4xl font-black italic tracking-tighter mb-4">PROB<span className="text-[#3E6BFF]">NEST.</span></h2>
          <p className="text-gray-500 max-w-sm mx-auto font-medium text-sm leading-relaxed mb-20 text-center">The first AI platform that hunts for startup ideas while you sleep.</p>
          <div className="max-w-7xl mx-auto mt-10 pt-10 border-t border-white/5 text-[10px] font-black text-gray-600 uppercase tracking-widest">
             <span>© 2026 PROBNEST AI. THE FIX-ITCH INITIATIVE.</span>
          </div>
      </footer>

    </div>
  );
}
