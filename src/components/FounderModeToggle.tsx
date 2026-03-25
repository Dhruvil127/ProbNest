'use client';

import { motion } from 'framer-motion';
import { Rocket, User } from 'lucide-react';
import { useFounderMode } from '@/context/FounderModeContext';

export default function FounderModeToggle() {
  const { founderMode, toggleFounderMode } = useFounderMode();

  return (
    <button
      type="button"
      onClick={toggleFounderMode}
      aria-pressed={founderMode}
      aria-label={founderMode ? 'Disable Founder Mode' : 'Enable Founder Mode'}
      className="relative inline-flex h-12 w-[236px] items-center rounded-full border border-white/12 bg-white/[0.04] p-1 text-sm text-white/80 backdrop-blur-xl transition-all duration-300 ease-in-out hover:border-white/18 hover:bg-white/[0.07]"
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        className={`absolute top-1 h-10 w-[114px] rounded-full shadow-lg ${
          founderMode
            ? 'left-[118px] bg-gradient-to-r from-sky-500 to-indigo-500'
            : 'left-1 bg-white/[0.08]'
        }`}
      />

      <span className="relative z-10 flex w-1/2 items-center justify-center gap-2">
        <User className={`h-4 w-4 ${founderMode ? 'text-white/50' : 'text-[var(--accent-strong)]'}`} />
        <span className={founderMode ? 'text-white/58' : 'text-white'}>Normal</span>
      </span>

      <span className="relative z-10 flex w-1/2 items-center justify-center gap-2">
        <Rocket className={`h-4 w-4 ${founderMode ? 'text-white' : 'text-white/50'}`} />
        <span className={founderMode ? 'text-white' : 'text-white/58'}>Founder Mode</span>
      </span>
    </button>
  );
}
