'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, X } from 'lucide-react';

type VisionData = {
  title: string;
  slug: string;
  category: string;
  problemDescription: string;
  whyItHappens: string[];
  solutions: string[];
  opportunity: string;
};

type VisionStep = {
  id: string;
  eyebrow: string;
  title: string;
  tone: 'neutral' | 'danger' | 'hope' | 'opportunity' | 'impact';
  description: string;
  bullets?: string[];
};

const IMPACT_BY_CATEGORY: Record<
  string,
  { users: string; revenue: string; market: string }
> = {
  'Money & Finance': {
    users: '1.8M+',
    revenue: 'Rs12Cr/year potential',
    market: 'Fintech demand is rising around savings behavior and spend visibility.',
  },
  'Students & Career': {
    users: '1.2M+',
    revenue: 'Rs10Cr/year potential',
    market: 'Career-tech and skilling products continue to expand in India and globally.',
  },
  'Psychology & Life': {
    users: '900k+',
    revenue: 'Rs8Cr/year potential',
    market: 'Wellness and behavioral products keep growing as digital self-improvement demand rises.',
  },
  'Daily Life Problems': {
    users: '1.5M+',
    revenue: 'Rs9Cr/year potential',
    market: 'Routine pain points convert well into habit, logistics, and convenience products.',
  },
  'Tech & Internet': {
    users: '2M+',
    revenue: 'Rs14Cr/year potential',
    market: 'Internet workflow pain spreads fast and monetizes quickly through SaaS or consumer tools.',
  },
};

function toFutureRisk(reason: string) {
  const clean = reason.replace(/\.$/, '');
  const lower = clean.charAt(0).toLowerCase() + clean.slice(1);
  return `More ${lower}`;
}

function toFutureWin(solution: string) {
  const clean = solution.replace(/\.$/, '');
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function buildSteps(data: VisionData): VisionStep[] {
  const impact = IMPACT_BY_CATEGORY[data.category] ?? {
    users: '1M+',
    revenue: 'Rs10Cr/year potential',
    market: 'A strong recurring pain point can convert into a scalable software or service business.',
  };

  return [
    {
      id: 'current',
      eyebrow: 'Current Reality',
      title: data.title,
      tone: 'neutral',
      description: data.problemDescription,
      bullets: data.whyItHappens.slice(0, 3),
    },
    {
      id: 'dark',
      eyebrow: 'If Nothing Changes',
      title: 'The friction compounds into a darker future.',
      tone: 'danger',
      description: 'This problem does not stay small. It spreads into worse decisions, wasted time, and long-term economic or emotional loss.',
      bullets: data.whyItHappens.slice(0, 3).map(toFutureRisk),
    },
    {
      id: 'bright',
      eyebrow: 'If This Gets Solved',
      title: 'A better future becomes visible and practical.',
      tone: 'hope',
      description: 'Once the system improves, users move with more clarity, less stress, and stronger outcomes.',
      bullets: data.solutions.slice(0, 3).map(toFutureWin),
    },
    {
      id: 'opportunity',
      eyebrow: 'Opportunity Appears',
      title: 'Someone decides to build the missing layer.',
      tone: 'opportunity',
      description: data.opportunity,
    },
    {
      id: 'impact',
      eyebrow: 'Impact + Money',
      title: 'This can become a real startup, not just an idea.',
      tone: 'impact',
      description: impact.market,
      bullets: [`Users: ${impact.users}`, `Revenue: ${impact.revenue}`, `Market: ${impact.market}`],
    },
  ];
}

function getToneClasses(tone: VisionStep['tone']) {
  switch (tone) {
    case 'danger':
      return {
        shell:
          'bg-[radial-gradient(circle_at_top,rgba(255,95,95,0.18),transparent_28%),linear-gradient(180deg,rgba(42,8,16,0.98)_0%,rgba(18,4,9,0.98)_100%)]',
        eyebrow: 'text-red-200/90',
        title: 'text-white',
        accent: 'bg-red-400',
        panel: 'border-red-300/18 bg-red-500/[0.05]',
      };
    case 'hope':
      return {
        shell:
          'bg-[radial-gradient(circle_at_top,rgba(103,213,192,0.18),transparent_28%),radial-gradient(circle_at_right,rgba(136,174,247,0.18),transparent_24%),linear-gradient(180deg,rgba(7,28,34,0.98)_0%,rgba(5,15,24,0.98)_100%)]',
        eyebrow: 'text-emerald-200/90',
        title: 'text-white',
        accent: 'bg-emerald-300',
        panel: 'border-emerald-200/18 bg-emerald-400/[0.05]',
      };
    case 'opportunity':
      return {
        shell:
          'bg-[radial-gradient(circle_at_top,rgba(214,163,93,0.2),transparent_28%),linear-gradient(180deg,rgba(28,20,9,0.98)_0%,rgba(11,9,6,0.98)_100%)]',
        eyebrow: 'text-amber-200/90',
        title: 'text-white',
        accent: 'bg-[var(--accent-strong)]',
        panel: 'border-amber-200/18 bg-amber-400/[0.05]',
      };
    case 'impact':
      return {
        shell:
          'bg-[radial-gradient(circle_at_top,rgba(136,174,247,0.2),transparent_28%),radial-gradient(circle_at_left,rgba(214,163,93,0.14),transparent_26%),linear-gradient(180deg,rgba(8,18,36,0.98)_0%,rgba(4,10,20,0.98)_100%)]',
        eyebrow: 'text-sky-200/90',
        title: 'text-white',
        accent: 'bg-[var(--brand)]',
        panel: 'border-sky-200/18 bg-sky-400/[0.05]',
      };
    default:
      return {
        shell:
          'bg-[radial-gradient(circle_at_top,rgba(136,174,247,0.14),transparent_28%),linear-gradient(180deg,rgba(8,18,36,0.98)_0%,rgba(5,11,20,0.98)_100%)]',
        eyebrow: 'text-[var(--accent-strong)]',
        title: 'text-white',
        accent: 'bg-[var(--accent-strong)]',
        panel: 'border-white/10 bg-white/[0.03]',
      };
  }
}

export default function VisionEngine(data: VisionData) {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const steps = buildSteps(data);
  const current = steps[stepIndex];
  const tone = getToneClasses(current.tone);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }

      if (event.key === 'ArrowRight') {
        setStepIndex((value) => Math.min(value + 1, steps.length - 1));
      }

      if (event.key === 'ArrowLeft') {
        setStepIndex((value) => Math.max(value - 1, 0));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, steps.length]);

  const openVision = () => {
    setStepIndex(0);
    setOpen(true);
  };

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button type="button" onClick={openVision} className="btn-primary">
          <Sparkles className="h-4 w-4" />
          See the Future of This Problem
        </button>
        <p className="text-sm uppercase tracking-[0.28em] text-app-muted">Vision Engine</p>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] overflow-y-auto bg-black/70 backdrop-blur-xl"
          >
            <div className={`min-h-screen ${tone.shell}`}>
              <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.34em] text-app-muted">Problem Simulator</p>
                    <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">Vision Engine</h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/80 hover:bg-white/[0.08] hover:text-white"
                    aria-label="Close Vision Engine"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid flex-1 gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${tone.accent}`} />
                      <p className={`text-sm font-semibold uppercase tracking-[0.32em] ${tone.eyebrow}`}>{current.eyebrow}</p>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35 }}
                      >
                        <h3 className={`mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.06em] ${tone.title} md:text-7xl`}>
                          {current.title}
                        </h3>

                        <p className="mt-6 max-w-3xl text-lg leading-9 text-white/78 md:text-xl">{current.description}</p>

                        {current.bullets?.length ? (
                          <ul className="mt-8 space-y-4">
                            {current.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-4">
                                <span className={`mt-3 h-2.5 w-2.5 rounded-full ${tone.accent}`} />
                                <span className="max-w-2xl text-base leading-8 text-white/84 md:text-lg">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className={`rounded-[36px] border p-6 sm:p-8 ${tone.panel}`}>
                    <p className="text-xs uppercase tracking-[0.34em] text-app-muted">Story Flow</p>
                    <div className="mt-6 space-y-4">
                      {steps.map((step, index) => (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => setStepIndex(index)}
                          className={`flex w-full items-start justify-between gap-4 border-b pb-4 text-left transition ${
                            index === stepIndex ? 'border-white/22 text-white' : 'border-white/8 text-white/52 hover:text-white/80'
                          }`}
                        >
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.28em] text-app-muted">{`0${index + 1}`}</p>
                            <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">{step.eyebrow}</p>
                          </div>
                          <ArrowRight className={`mt-1 h-4 w-4 shrink-0 transition ${index === stepIndex ? 'translate-x-1' : ''}`} />
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setStepIndex((value) => Math.max(value - 1, 0))}
                        disabled={stepIndex === 0}
                        className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>

                      {stepIndex < steps.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setStepIndex((value) => Math.min(value + 1, steps.length - 1))}
                          className="btn-primary"
                        >
                          Swipe Forward
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
