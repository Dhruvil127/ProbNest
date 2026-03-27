'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import ProblemCard from '@/components/ProblemCard';
import ProblemSwipeCard from '@/components/ProblemSwipeCard';
import { DEMO_PROBLEMS } from '@/lib/demo-content';

const EMPTY_FAVORITES_SNAPSHOT = '[]';

const STARTUP_SHOWCASES = [
  {
    startup: 'LedgerLoop',
    founder: 'Aarav Mehta',
    coFounder: 'Neha Singh',
    solved: 'Freelancer invoicing and payment follow-up',
    slug: 'freelancer-invoicing-complexity',
  },
  {
    startup: 'CancelKit',
    founder: 'Riya Khanna',
    coFounder: 'Kabir Jain',
    solved: 'SaaS subscription cancellation pain',
    slug: 'saas-cancellation-friction',
  },
  {
    startup: 'SpendPilot',
    founder: 'Vihaan Rao',
    coFounder: 'Ira Thomas',
    solved: 'Saving money despite stable income',
    slug: 'why-people-cant-save-money',
  },
  {
    startup: 'OneWatch',
    founder: 'Mihir Shah',
    coFounder: 'Sara Khan',
    solved: 'Streaming decision fatigue',
    slug: 'streaming-choice-paralysis',
  },
  {
    startup: 'CloseCircle',
    founder: 'Anaya Gill',
    coFounder: 'Reyansh Patel',
    solved: 'Adult friendship coordination',
    slug: 'adult-friendship-maintenance',
  },
];

const SWIPE_PROBLEMS = DEMO_PROBLEMS.slice(0, 3).map((problem) => ({
  _id: problem._id,
  title: problem.title.replace(/\?$/, ''),
  slug: problem.slug,
  category: problem.category,
  description: problem.problemDescription,
  opportunity: problem.opportunity,
  votes: problem.votes,
}));

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(SWIPE_PROBLEMS.length - 1);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const favoritesSnapshot = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);
      window.addEventListener('pb-favorites-updated', onStoreChange);

      return () => {
        window.removeEventListener('storage', onStoreChange);
        window.removeEventListener('pb-favorites-updated', onStoreChange);
      };
    },
    () => window.localStorage.getItem('pb_favorites') ?? EMPTY_FAVORITES_SNAPSHOT,
    () => EMPTY_FAVORITES_SNAPSHOT
  );

  const favorites = useMemo(() => JSON.parse(favoritesSnapshot) as string[], [favoritesSnapshot]);
  const latestPosts = useMemo(() => [...DEMO_PROBLEMS].sort((a, b) => b.views - a.views), []);
  const showcase = STARTUP_SHOWCASES[showcaseIndex % STARTUP_SHOWCASES.length];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowcaseIndex((value) => (value + 1) % STARTUP_SHOWCASES.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const swiped = (direction: 'left' | 'right', id: string) => {
    if (direction === 'right') {
      const nextFavorites = [...new Set([...favorites, id])];
      localStorage.setItem('pb_favorites', JSON.stringify(nextFavorites));
    }

    setCurrentIndex((value) => value - 1);
    window.dispatchEvent(new Event('pb-favorites-updated'));
  };

  return (
    <div className="page-shell pb-20">
      <section className="page-section pt-10 lg:pt-14">
        <div className="relative mx-auto flex min-h-[760px] w-full items-center justify-center overflow-hidden">
          <div className="hero-glow absolute inset-x-8 top-24 h-72 rounded-full" />

          <div className="absolute left-0 top-1/2 z-10 hidden w-[240px] -translate-y-1/2 xl:block 2xl:left-[2%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${showcase.startup}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.45 }}
              >
                <div className="border-l border-white/14 pl-5">
                  <Link href={`/problem/${showcase.slug}`} className="block">
                    <h3 className="font-display text-4xl leading-none tracking-[-0.06em] text-white transition-colors hover:text-[var(--accent-strong)] 2xl:text-5xl">
                      {showcase.startup}
                    </h3>
                  </Link>
                  <Link
                    href={`/problem/${showcase.slug}`}
                    className="mt-4 block text-lg leading-8 text-app-muted transition-colors hover:text-white 2xl:text-xl"
                  >
                    {showcase.founder} + {showcase.coFounder}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute right-0 top-1/2 z-10 hidden w-[240px] -translate-y-1/2 xl:block 2xl:right-[2%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${showcase.startup}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45 }}
              >
                <div className="border-r border-white/14 pr-5 text-right">
                  <Link
                    href={`/problem/${showcase.slug}`}
                    className="block text-2xl leading-10 tracking-[-0.03em] text-white/90 transition-colors hover:text-[var(--accent-strong)] 2xl:text-3xl 2xl:leading-[3rem]"
                  >
                    {showcase.solved}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[640px] justify-center">
            <div className="premium-card relative w-full max-w-[540px] overflow-hidden p-5 sm:p-6">
              <div className="relative h-[560px]">
                <AnimatePresence mode="popLayout">
                  {currentIndex >= 0 ? (
                    SWIPE_PROBLEMS.slice(0, currentIndex + 1).map((problem, index) => (
                      <ProblemSwipeCard
                        key={problem._id}
                        problem={problem}
                        onSwipe={(direction) => swiped(direction, problem._id)}
                        isTop={index === currentIndex}
                        stackIndex={currentIndex - index}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="premium-card absolute inset-0 flex flex-col items-center justify-center gap-5 p-10 text-center"
                    >
                      <div className="gold-ring flex h-20 w-20 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#f4c684_0%,#d6a35d_60%,#8c6333_100%)]">
                        <Check className="h-9 w-9 text-slate-950" />
                      </div>
                      <div>
                        <h3 className="font-display text-4xl tracking-[-0.05em] text-white">Signal stack complete</h3>
                        <p className="mt-3 max-w-sm text-sm leading-7 text-app-muted">
                          You reviewed today&apos;s strongest ideas. Restart to keep exploring.
                        </p>
                      </div>
                      <button type="button" onClick={() => setCurrentIndex(SWIPE_PROBLEMS.length - 1)} className="btn-primary">
                        Restart stack
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {currentIndex >= 0 ? (
                <div className="mt-6 flex items-center justify-center gap-5 text-sm uppercase tracking-[0.28em] text-app-muted">
                  <span className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4 rotate-[35deg]" />
                    Swipe
                    <ArrowRight className="h-4 w-4 -rotate-[35deg]" />
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section mt-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-app-muted">Trending problems</p>
            <h2 className="section-heading mt-2 text-white">High-signal friction users keep returning to solve.</h2>
          </div>
          <Link href="/categories" className="hidden text-sm font-medium text-[var(--brand)] sm:inline-flex">
            View all
          </Link>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {latestPosts.slice(0, 3).map((problem, index) => (
            <ProblemCard
              key={problem.slug}
              title={problem.title}
              slug={problem.slug}
              category={problem.category}
              problemDescription={problem.problemDescription}
              opportunity={problem.opportunity}
              views={problem.views}
              delay={index * 0.08}
            />
          ))}
        </div>
      </section>

      <section className="page-section mt-16">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.24em] text-app-muted">Latest posts</p>
          <h2 className="section-heading mt-2 text-white">Fresh insights for builders hunting the next innovation.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {DEMO_PROBLEMS.slice(0, 4).map((problem, index) => (
            <ProblemCard
              key={problem.slug}
              title={problem.title}
              slug={problem.slug}
              category={problem.category}
              problemDescription={problem.problemDescription}
              opportunity={problem.opportunity}
              views={problem.views}
              delay={index * 0.06}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
