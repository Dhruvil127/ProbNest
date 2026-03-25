'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import FounderSwipeCards, { type FounderSwipeData } from '@/components/FounderSwipeCards';
import { useFounderMode } from '@/context/FounderModeContext';

export default function ProblemModeView({
  title,
  category,
  founderData,
  children,
}: {
  title: string;
  category: string;
  founderData: FounderSwipeData;
  children: ReactNode;
}) {
  const { founderMode } = useFounderMode();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {founderMode ? (
        <motion.section
          key="founder-mode"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="page-section pt-10"
        >
          <div className="rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(136,174,247,0.18),transparent_26%),radial-gradient(circle_at_right,rgba(214,163,93,0.14),transparent_22%),linear-gradient(180deg,rgba(10,18,34,0.98)_0%,rgba(7,11,20,0.98)_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
            <div className="mx-auto mb-10 max-w-6xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-sky-400/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100 ring-1 ring-sky-300/16">
                  Founder Mode
                </span>
                <span className="rounded-full bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/58 ring-1 ring-white/10">
                  {category}
                </span>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <h2 className="font-display text-4xl leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                    Startup lens for {title}.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                    Money first. Execution first. Market gap first. Founder Mode removes the reading flow and turns this page into a startup decision interface.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/46">Market Size</p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">{founderData.opportunity.market}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/46">Opportunity Score</p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">{founderData.opportunity.score.toFixed(1)}/10</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/46">Revenue Signal</p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">{founderData.revenue.result}</p>
                  </div>
                </div>
              </div>
            </div>

            <FounderSwipeCards data={founderData} />
          </div>
        </motion.section>
      ) : (
        <motion.div
          key="normal-mode"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
