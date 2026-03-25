'use client';

import { useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CircleDollarSign, Gauge, Sparkles, TrendingUp } from 'lucide-react';

export interface FounderSwipeIdea {
  title: string;
  description: string;
  monetization: string;
}

export interface FounderSwipeCompetitor {
  name: string;
  flaw: string;
}

export interface FounderSwipeData {
  opportunity: {
    market: string;
    demand: 'High' | 'Medium' | 'Low';
    score: number;
    demandPercent: number;
  };
  ideas: FounderSwipeIdea[];
  competitors: FounderSwipeCompetitor[];
  gap: string;
  execution: string[];
  revenue: {
    simulation: string;
    result: string;
  };
}

const SWIPE_THRESHOLD = 110;

function demandTone(demand: FounderSwipeData['opportunity']['demand']) {
  if (demand === 'High') {
    return 'text-emerald-200 bg-emerald-400/12 ring-1 ring-emerald-300/16';
  }

  if (demand === 'Medium') {
    return 'text-amber-200 bg-amber-400/12 ring-1 ring-amber-300/16';
  }

  return 'text-rose-200 bg-rose-400/12 ring-1 ring-rose-300/16';
}

function FounderInsightCard({
  title,
  eyebrow,
  accent,
  children,
}: {
  title: string;
  eyebrow: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <article className="relative overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_100%)] p-6 shadow-[0_25px_80px_rgba(2,6,23,0.38)] backdrop-blur-2xl sm:p-8">
      <div className={`absolute inset-x-10 top-0 h-px ${accent}`} />
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/56">{eyebrow}</p>
      <h3 className="mt-4 font-display text-4xl leading-none tracking-[-0.05em] text-white sm:text-5xl">{title}</h3>
      <div className="mt-8">{children}</div>
    </article>
  );
}

function OpportunitySnapshotCard({ data }: { data: FounderSwipeData }) {
  return (
    <FounderInsightCard
      title="Opportunity Snapshot"
      eyebrow="Card 01"
      accent="bg-gradient-to-r from-sky-400/0 via-sky-300/80 to-sky-400/0"
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/48">Market Size</p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">{data.opportunity.market}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/48">Demand Level</p>
          <div className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${demandTone(data.opportunity.demand)}`}>
            {data.opportunity.demand}
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/48">Opportunity Score</p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">{data.opportunity.score.toFixed(1)}/10</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/45">Decision Meter</span>
          <span className="text-sm text-sky-100">{data.opportunity.demandPercent}%</span>
        </div>
        <div className="h-3 rounded-full bg-white/10">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300"
            style={{ width: `${data.opportunity.demandPercent}%` }}
          />
        </div>
      </div>
    </FounderInsightCard>
  );
}

function BusinessIdeasCard({ data }: { data: FounderSwipeData }) {
  return (
    <FounderInsightCard
      title="Business Ideas"
      eyebrow="Card 02"
      accent="bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent-strong)]/80 to-[var(--accent)]/0"
    >
      <div className="grid gap-4">
        {data.ideas.map((idea) => (
          <div
            key={idea.title}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.08]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-2xl font-semibold tracking-[-0.04em] text-white">{idea.title}</h4>
                <p className="mt-2 text-sm leading-7 text-white/68">{idea.description}</p>
              </div>
              <span className="shrink-0 rounded-full bg-sky-400/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-100">
                {idea.monetization}
              </span>
            </div>
          </div>
        ))}
      </div>
    </FounderInsightCard>
  );
}

function MarketGapCard({ data }: { data: FounderSwipeData }) {
  return (
    <FounderInsightCard
      title="Market Gap"
      eyebrow="Card 03"
      accent="bg-gradient-to-r from-emerald-400/0 via-emerald-300/80 to-emerald-400/0"
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-3">
          {data.competitors.map((competitor) => (
            <div key={competitor.name} className="rounded-3xl border border-white/10 bg-black/10 p-4">
              <p className="text-lg font-semibold text-white">{competitor.name}</p>
              <p className="mt-2 text-sm leading-6 text-white/62">{competitor.flaw}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-emerald-200/12 bg-emerald-400/[0.08] p-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-200/72">Gap Statement</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">{data.gap}</p>
        </div>
      </div>
    </FounderInsightCard>
  );
}

function ExecutionPlanCard({ data }: { data: FounderSwipeData }) {
  const labels = ['Build MVP', 'Launch to niche', 'Add key feature', 'Monetize'];

  return (
    <FounderInsightCard
      title="Execution Plan"
      eyebrow="Card 04"
      accent="bg-gradient-to-r from-violet-400/0 via-violet-300/80 to-violet-400/0"
    >
      <div className="grid gap-4">
        {data.execution.map((step, index) => (
          <div key={step} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-white/45">{labels[index] ?? `Step ${index + 1}`}</p>
              <p className="mt-2 text-lg text-white/86">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </FounderInsightCard>
  );
}

function RevenueSimulationCard({ data }: { data: FounderSwipeData }) {
  return (
    <FounderInsightCard
      title="Revenue Simulation"
      eyebrow="Card 05"
      accent="bg-gradient-to-r from-amber-400/0 via-amber-300/80 to-amber-400/0"
    >
      <div className="rounded-3xl border border-white/10 bg-black/10 p-6">
        <p className="text-sm uppercase tracking-[0.28em] text-white/48">Example math</p>
        <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">{data.revenue.simulation}</p>
        <div className="mt-6 rounded-3xl border border-amber-200/12 bg-amber-400/[0.08] p-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-amber-100/70">Projected Monthly Revenue</p>
          <p className="mt-3 text-5xl font-semibold tracking-[-0.07em] text-white">{data.revenue.result}</p>
        </div>
      </div>
    </FounderInsightCard>
  );
}

export default function FounderSwipeCards({ data }: { data: FounderSwipeData }) {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      id: 'opportunity',
      icon: Gauge,
      label: 'Snapshot',
      node: <OpportunitySnapshotCard data={data} />,
    },
    {
      id: 'ideas',
      icon: Sparkles,
      label: 'Ideas',
      node: <BusinessIdeasCard data={data} />,
    },
    {
      id: 'gap',
      icon: TrendingUp,
      label: 'Gap',
      node: <MarketGapCard data={data} />,
    },
    {
      id: 'execution',
      icon: BriefcaseBusiness,
      label: 'Execution',
      node: <ExecutionPlanCard data={data} />,
    },
    {
      id: 'revenue',
      icon: CircleDollarSign,
      label: 'Revenue',
      node: <RevenueSimulationCard data={data} />,
    },
  ];

  const handleDirection = (direction: 'next' | 'prev') => {
    setCurrentCard((value) => {
      if (direction === 'next') {
        return Math.min(value + 1, cards.length - 1);
      }

      return Math.max(value - 1, 0);
    });
  };

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_THRESHOLD) {
      handleDirection('next');
    }

    if (info.offset.x >= SWIPE_THRESHOLD) {
      handleDirection('prev');
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setCurrentCard(index)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${
                  index === currentCard
                    ? 'bg-white/[0.12] text-white ring-1 ring-white/16'
                    : 'bg-white/[0.04] text-white/54 ring-1 ring-white/8 hover:text-white/82'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {card.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {cards.map((card, index) => (
            <span
              key={card.id}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentCard ? 'w-10 bg-white' : 'w-2.5 bg-white/22'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative min-h-[540px]">
        <div className="absolute inset-x-10 top-10 h-[88%] rounded-[32px] bg-white/[0.03] blur-md" />
        {cards[currentCard + 1] ? (
          <div className="absolute inset-x-6 top-5 z-0 scale-[0.97] rounded-[32px] border border-white/8 bg-white/[0.04] p-10 opacity-70" />
        ) : null}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cards[currentCard].id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, x: 70, rotate: 1.5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -70, rotate: -1.5 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="relative z-10"
          >
            {cards[currentCard].node}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleDirection('prev')}
          disabled={currentCard === 0}
          className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <p className="text-sm uppercase tracking-[0.28em] text-app-muted">Swipe or tap next</p>

        <button
          type="button"
          onClick={() => handleDirection('next')}
          disabled={currentCard === cards.length - 1}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
