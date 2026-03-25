'use client';

import Link from 'next/link';
import { Lightbulb, Bookmark, Menu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CATEGORIES = [
  { name: "Finance", slug: "finance" },
  { name: "Career", slug: "career" },
  { name: "Life", slug: "life" },
  { name: "Tech", slug: "tech" }
];

export default function Navbar() {
  const [isCatOpen, setIsCatOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-[100] w-full bg-[#000]/60 backdrop-blur-2xl border-b border-white/[0.08] selection:bg-[#3E6BFF]/30 selection:text-white">
      <div className="max-w-screen-2xl mx-auto px-10">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-16">
            {/* Probnest logo - Minimalist & Premium */}
            <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group">
              <div className="w-9 h-9 flex items-center justify-center relative bg-[#3E6BFF] rounded-xl shadow-[0_0_30px_rgba(62,107,255,0.4)]">
                 <svg viewBox="0 0 40 40" className="w-5 h-5 text-white fill-current"><path d="M20 0L0 20L20 40L40 20L20 0ZM20 10L30 20L20 30L10 20L20 10Z"/></svg>
              </div>
              <span className="font-extrabold text-2xl tracking-tighter text-white uppercase italic">
                PROB<span className="text-[#3E6BFF]">NEST</span>
              </span>
            </Link>

            {/* Main Navigation Links */}
            <div className="hidden lg:flex items-center gap-10">
              <Link href="/" className="text-[12px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Insights</Link>
              <Link href="/top-10" className="text-[12px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Top 10</Link>
              
              <div 
                className="relative cursor-pointer"
                onMouseEnter={() => setIsCatOpen(true)}
                onMouseLeave={() => setIsCatOpen(false)}
              >
                <div className="text-[12px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors flex items-center gap-1">
                  Problems <ChevronRight className={`w-3 h-3 transition-transform ${isCatOpen ? 'rotate-90' : ''}`} />
                </div>
                <AnimatePresence>
                  {isCatOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-60 bg-[#111] border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl"
                    >
                      {CATEGORIES.map((cat) => (
                        <Link 
                          key={cat.slug}
                          href={`/categories?filter=${cat.name}`}
                          className="block px-4 py-3 text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-[#3E6BFF] hover:bg-white/5 transition-all rounded-xl"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/mission" className="text-[12px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Mission</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="/favorites" 
              className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 px-6 py-2 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white/70 hover:text-white"
            >
              <Bookmark className="w-4 h-4 fill-current text-[#3E6BFF]" /> Bank
            </Link>

            <Link 
              href="/submit" 
              className="px-8 py-3 bg-[#3E6BFF] text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all shadow-[0_15px_30px_rgba(62,107,255,0.3)] active:scale-95"
            >
              Post Itch
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
