'use client';

import React from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bookmark, X } from 'lucide-react';

interface ProblemProps {
  _id: string;
  title: string;
  category: string;
  description: string;
  opportunity: string;
  votes: string;
}

export default function ProblemSwipeCard({
  problem,
  onSwipe,
  isTop,
  stackIndex,
}: {
  problem: ProblemProps;
  onSwipe: (dir: 'left' | 'right') => void;
  isTop: boolean;
  stackIndex: number;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 180], [-13, 13]);
  const likeOpacity = useTransform(x, [40, 120], [0, 1]);
  const skipOpacity = useTransform(x, [-120, -40], [1, 0]);
  const backgroundOpacity = useTransform(x, [-160, 0, 160], [0.45, 1, 0.45]);
  const topOffset = stackIndex * 18;
  const insetOffset = stackIndex * 14;
  const restingScale = 1 - stackIndex * 0.035;
  const scale = useSpring(isTop ? 1 : restingScale, { stiffness: 300, damping: 28 });

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    if (info.offset.x > 95) {
      onSwipe('right');
    } else if (info.offset.x < -95) {
      onSwipe('left');
    }
  };

  if (!isTop) {
    return (
      <motion.div
        style={{ scale }}
        className="absolute bottom-0"
        animate={{
          left: insetOffset,
          right: insetOffset,
          top: topOffset,
          opacity: 0.72 - stackIndex * 0.16,
        }}
      >
        <div className="relative h-[520px] overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(17,27,46,0.94)_0%,rgba(9,16,30,0.92)_55%,rgba(7,13,24,0.96)_100%)] shadow-[0_18px_40px_rgba(2,6,23,0.2)]">
          <div className="absolute inset-x-10 top-10 h-20 rounded-full bg-[radial-gradient(circle,rgba(214,163,93,0.16),transparent_70%)] blur-2xl" />
          <div className="relative flex h-full flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="pill px-3 py-1.5 text-[10px] text-[var(--accent-strong)]">{problem.category}</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">Queued</span>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.24em] text-app-muted">Next problem</p>
              <h3 className="mt-3 font-display text-3xl leading-[1.02] tracking-[-0.05em] text-white/92 sm:text-4xl">
                {problem.title}?
              </h3>
              <p className="mt-4 max-w-[28ch] text-sm leading-7 text-white/55">{problem.description}</p>
            </div>

            <div className="mt-auto border-t border-white/8 pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">Opportunity</p>
              <p className="mt-3 text-sm leading-7 text-white/60">{problem.opportunity}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, scale, opacity: backgroundOpacity }}
      className="absolute inset-0 cursor-grab select-none active:cursor-grabbing"
    >
      <div className="relative h-full overflow-hidden rounded-[34px] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(160deg,rgba(22,34,58,0.98)_0%,rgba(9,16,30,0.98)_50%,rgba(8,15,27,1)_100%)] p-6 shadow-[0_32px_80px_rgba(2,6,23,0.45)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(214,163,93,0.22),transparent_70%)]" />
        <div className="absolute -right-16 top-12 h-48 w-48 rounded-full bg-[rgba(136,174,247,0.18)] blur-3xl" />

        <AnimatePresence>
          <motion.div
            key="save-indicator"
            style={{ opacity: likeOpacity }}
            className="absolute inset-0 z-20 grid place-items-center bg-[rgba(103,213,192,0.12)] pointer-events-none"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-950 shadow-xl">
              <Bookmark className="h-8 w-8 fill-current text-[var(--accent)]" />
            </div>
          </motion.div>
          <motion.div
            key="skip-indicator"
            style={{ opacity: skipOpacity }}
            className="absolute inset-0 z-20 grid place-items-center bg-black/20 pointer-events-none"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md">
              <X className="h-8 w-8" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="pill px-3 py-1.5 text-[10px] text-[var(--accent-strong)]">{problem.category}</span>
          </div>

          <div className="mt-10">
            <p className="text-sm uppercase tracking-[0.24em] text-app-muted">The problem</p>
            <h2 className="mt-3 font-display text-4xl leading-[1] tracking-[-0.05em] text-white sm:text-5xl">
              {problem.title}?
            </h2>
            <p className="mt-5 text-sm leading-7 text-app-muted">{problem.description}</p>
          </div>

          <div className="mt-auto">
            <div className="border-t border-white/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">Opportunity</p>
              <p className="mt-3 text-sm leading-7 text-white/88">{problem.opportunity}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
