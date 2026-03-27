'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import FounderModeToggle from '@/components/FounderModeToggle';

const NAV_LINKS = [
  { href: '/', label: 'Discover' },
  { href: '/categories', label: 'Categories' },
  { href: '/favorites', label: 'Favorites' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    window.addEventListener('resize', close);

    return () => window.removeEventListener('resize', close);
  }, [open]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 8) {
        setVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY) {
        setVisible(false);
        setOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-white/10 px-2 py-3 sm:px-4">
          <Link href="/" className="flex items-center gap-3">
            <div>
              <p className="font-display text-xl leading-none tracking-[-0.04em] text-white">ProblemBase</p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-app-muted">Market friction, curated</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-app-muted hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <FounderModeToggle />
            <Link href="/favorites" className="px-4 py-2 text-sm font-medium text-app-muted hover:text-white">
              Idea Bank
            </Link>
            <Link href="/submit" className="btn-primary px-5 py-2.5">
              Submit Problem
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="h-11 w-11 rounded-full border border-white/12 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-4 mt-3 lg:hidden"
          >
            <div className="border-t border-white/10 bg-[rgba(7,17,31,0.96)] p-4 backdrop-blur-xl">
              <div className="mb-4 flex justify-center">
                <FounderModeToggle />
              </div>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-1 py-3 text-sm font-medium text-app-muted hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid gap-3">
                <Link href="/favorites" onClick={() => setOpen(false)} className="px-1 py-2 text-sm font-medium text-app-muted hover:text-white">
                  Open Idea Bank
                </Link>
                <Link href="/submit" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Submit Problem
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
